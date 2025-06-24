"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCard,
  Info,
  Loader2,
  Package,
  Shield,
  ShieldCheck,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import TemplateDownloadButton from "../docs/template-download-button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type Tables = Database["public"]["Tables"];
type UserProfile = Tables["user_profiles"]["Row"];
type Template = Tables["templates"]["Row"];
type UserTemplate = Tables["user_templates"]["Row"] & {
  templates?: Template;
};
type Payment = Tables["paid_users"]["Row"];
type DownloadRecord = Tables["template_downloads"]["Row"] & {
  templates?: Template;
};
type DisplayTemplate = UserTemplate;

type UserData = {
  profile: UserProfile | null;
  templates: UserTemplate[];
  payments: Payment[];
  downloads: DownloadRecord[];
};

type PaginationState = {
  page: number;
  pageSize: number;
};

interface InviteResult {
  email: string;
  status: "invited" | "active" | "error" | "skipped";
  message: string;
}

const inviteFormSchema = z.object({
  emails: z.string().min(1, {
    message: "At least one email address is required.",
  }),
});
type InviteFormValues = z.infer<typeof inviteFormSchema>;

const getPaginatedData = <T extends any>(
  data: T[],
  { page, pageSize }: PaginationState,
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: data.slice(start, end),
    start,
    end: Math.min(end, data.length),
  };
};

const getPageCount = (total: number, pageSize: number) =>
  Math.ceil(total / pageSize);

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    templates: [],
    payments: [],
    downloads: [],
  });
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);

  const [teamState, setTeamState] = useState<any>(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);
  const [teamSuccess, setTeamSuccess] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailsToConfirm, setEmailsToConfirm] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [pendingInvitation, setPendingInvitation] = useState<any>(null);
  const [isAccepting, setIsAccepting] = useState(false);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      emails: "",
    },
  });

  const [templatesPagination, setTemplatesPagination] =
    useState<PaginationState>({
      page: 1,
      pageSize: 5,
    });
  const [paymentsPagination, setPaymentsPagination] = useState<PaginationState>(
    {
      page: 1,
      pageSize: 5,
    },
  );

  const fetchTeamData = async () => {
    setTeamLoading(true);
    setTeamError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setTeamState(null);
        return;
      }
      const { data: directTeamData, error: directTeamError } =
        await supabase.rpc("get_team_data_for_user", { user_id: user.id });
      if (directTeamError) throw directTeamError;
      setTeamState(directTeamData || null);
    } catch (error: any) {
      console.error("Team data error:", error);
      setTeamError("Failed to load team data");
    } finally {
      setTeamLoading(false);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!currentUser) return;

      setUser(currentUser);

      const [invitationRes, profileRes, templatesRes, paymentsRes] =
        await Promise.all([
          supabase
            .from("team_members")
            .select("*, team_licenses(*)")
            .eq("email", currentUser.email)
            .eq("status", "invited")
            .maybeSingle(),
          supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", currentUser.id)
            .single(),
          supabase
            .from("user_templates")
            .select("*, templates:template_id (*)")
            .eq("user_id", currentUser.id),
          supabase
            .from("paid_users")
            .select("*")
            .eq("user_id", currentUser.id)
            .order("purchase_date", { ascending: false }),
        ]);

      if (invitationRes.error) throw invitationRes.error;
      setPendingInvitation(invitationRes.data);

      if (profileRes.error) throw profileRes.error;
      const profileData = profileRes.data;
      const hasLifetime = !!profileData?.has_lifetime_access;
      setHasLifetimeAccess(hasLifetime);

      if (templatesRes.error) throw templatesRes.error;
      if (paymentsRes.error) throw paymentsRes.error;

      if (hasLifetime) {
        const { data: allTemplatesData, error: allTemplatesError } =
          await supabase.from("templates").select("*").eq("published", true);
        if (allTemplatesError) throw allTemplatesError;
        setAllTemplates(allTemplatesData || []);
      }

      setUserData({
        profile: profileData || null,
        templates: templatesRes.data || [],
        payments: paymentsRes.data || [],
        downloads: [],
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchUserData(), fetchTeamData()]);
    };
    fetchAllData();
  }, []);

  const onSubmit = async (values: InviteFormValues) => {
    const emailList = values.emails
      .split(/[,\n]+/)
      .map((email: string) => email.trim())
      .filter((email: string) => email.length > 0 && email.includes("@"));

    if (emailList.length === 0) {
      setTeamError("Please enter at least one valid email address");
      return;
    }
    setEmailsToConfirm(emailList);
    setShowConfirmDialog(true);
  };

  const handleConfirmedSubmit = async () => {
    setSubmitLoading(true);
    setTeamError(null);
    setTeamSuccess(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: teamLicense, error: licenseError } = await supabase
        .from("team_licenses")
        .select("*")
        .eq("owner_user_id", user.id)
        .single();

      if (licenseError || !teamLicense) {
        throw new Error(
          `Failed to find your team license: ${licenseError?.message || "Not found."}`,
        );
      }

      const availableSeats = teamLicense.max_seats - teamLicense.used_seats;
      if (emailsToConfirm.length > availableSeats) {
        throw new Error(
          `Not enough seats. You are trying to invite ${emailsToConfirm.length} member(s), but you only have ${availableSeats} seat(s) available.`,
        );
      }

      let successCount = 0;
      const results: InviteResult[] = [];

      for (const email of emailsToConfirm) {
        const { data: existingMember, error: memberCheckError } = await supabase
          .from("team_members")
          .select("id, status")
          .eq("team_license_id", teamLicense.id)
          .eq("email", email)
          .maybeSingle();

        if (memberCheckError) {
          results.push({
            email,
            status: "error",
            message: `Error checking existing member: ${memberCheckError.message}`,
          });
          continue;
        }

        if (existingMember) {
          results.push({
            email,
            status: "skipped",
            message: `An invitation for this email already exists with status: ${existingMember.status}.`,
          });
          continue;
        }

        const { error: insertError } = await supabase
          .from("team_members")
          .insert({
            team_license_id: teamLicense.id,
            email: email,
            status: "invited",
            invitation_date: new Date().toISOString(),
          });

        if (insertError) {
          results.push({
            email,
            status: "error",
            message: insertError.message || "Failed to send invitation.",
          });
          continue;
        }

        results.push({
          email,
          status: "invited",
          message: "Invitation sent successfully.",
        });
        successCount++;
      }

      if (successCount > 0) {
        const newUsedSeats = teamLicense.used_seats + successCount;
        const { error: seatsError } = await supabase
          .from("team_licenses")
          .update({ used_seats: newUsedSeats })
          .eq("id", teamLicense.id);

        if (seatsError) {
          console.error("Failed to update seat count:", seatsError);
          setTeamError(
            "Invitations sent, but failed to update the seat count.",
          );
        }
      }

      const successMessage = `Successfully sent ${successCount} invitation(s).`;
      const skippedCount = results.filter((r) => r.status === "skipped").length;
      const errorMessage =
        results.filter((r) => r.status === "error").length > 0
          ? " Some invitations failed."
          : "";
      const skippedMessage =
        skippedCount > 0
          ? ` ${skippedCount} email(s) were already invited.`
          : "";
      setTeamSuccess(`${successMessage}${skippedMessage}${errorMessage}`);

      form.reset();
      setShowConfirmDialog(false);
      setEmailsToConfirm([]);
      await fetchTeamData();
    } catch (error: any) {
      console.error("Error sending team invitations:", error);
      setTeamError(error.message || "An unexpected error occurred.");
      setShowConfirmDialog(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    if (!pendingInvitation) return;

    setIsAccepting(true);
    const supabase = createClient();
    const { error } = await supabase.rpc("accept_team_invitation", {
      p_invitation_id: pendingInvitation.id,
    });

    if (error) {
      setTeamError(
        `Failed to accept invitation: ${error.message}. Please try again.`,
      );
      console.error("Error accepting invitation:", error);
    } else {
      setTeamSuccess("Invitation accepted! Welcome to the team.");
      setPendingInvitation(null);
      await Promise.all([fetchUserData(), fetchTeamData()]);
    }

    setIsAccepting(false);
  };

  const renderPagination = useCallback(
    (
      total: number,
      { page, pageSize }: PaginationState,
      onChange: (state: PaginationState) => void,
    ) => {
      const pageCount = getPageCount(total, pageSize);
      if (pageCount <= 1) return null;

      return (
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Rows per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) =>
                onChange({ page: 1, pageSize: parseInt(value) })
              }
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Pagination>
              <PaginationContent className="flex items-center space-x-2 text-sm text-muted-foreground">
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      page > 1 && onChange({ page: page - 1, pageSize })
                    }
                    className={cn(
                      page === 1 && "pointer-events-none opacity-50",
                    )}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      page < pageCount && onChange({ page: page + 1, pageSize })
                    }
                    className={cn(
                      page === pageCount && "pointer-events-none opacity-50",
                    )}
                  >
                    <ChevronRightIcon className="size-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      );
    },
    [],
  );

  const { profile, templates, payments } = userData;

  const templateData: DisplayTemplate[] = useMemo(
    () =>
      hasLifetimeAccess
        ? allTemplates.map((template) => ({
            templates: template,
            template_id: template.id,
            purchase_date:
              profile?.access_granted_date || new Date().toISOString(),
            created_at: null,
            id: parseInt(template.id.replace(/\D/g, "")) || 0,
            stripe_checkout_session_id: null,
            user_id: user?.id || "",
          }))
        : templates,
    [hasLifetimeAccess, allTemplates, templates, profile, user],
  );

  const paginatedTemplates = useMemo(
    () => getPaginatedData(templateData, templatesPagination).data,
    [templateData, templatesPagination],
  );

  const paginatedPayments = useMemo(
    () => getPaginatedData(payments, paymentsPagination).data,
    [payments, paymentsPagination],
  );

  if (loading) {
    return (
      <div className="container min-h-screen py-10 space-y-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen py-10 space-y-10 max-w-6xl mx-auto">
      {user && (
        <div className="flex flex-col md:flex-row items-start gap-6 pb-6 border-b">
          <Avatar className="size-20 md:size-24">
            <AvatarImage
              src={user.user_metadata?.avatar_url || ""}
              alt={user.email || "User"}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {user.user_metadata?.full_name || user.email}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              {profile?.has_lifetime_access && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 h-7 px-3 py-1"
                >
                  <ShieldCheck className="size-4" />
                  <span className="font-medium">Lifetime Access</span>
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Package className="size-4" />
                <span>
                  {hasLifetimeAccess
                    ? "All Templates Included"
                    : `${templates.length} Template${templates.length !== 1 ? "s" : ""} Purchased`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {pendingInvitation && (
        <Alert variant="default" className="border-primary/50 bg-primary/5">
          <Info className="h-4 w-4" />
          <AlertTitle className="font-semibold">
            You have a pending team invitation!
          </AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
            <p className="mb-2 sm:mb-0">
              You've been invited to join a team. Accept the invitation to get
              access to all team resources.
            </p>
            <Button onClick={handleAcceptInvitation} disabled={isAccepting}>
              {isAccepting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Accept Invitation
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Tabs variant="underline" defaultValue="personal" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger
            value="personal"
            className="cursor-pointer flex items-center gap-2"
          >
            <UserCircle className="size-4" />
            <span>Personal</span>
          </TabsTrigger>
          {(teamState ||
            (userData.profile?.has_lifetime_access &&
              payments.some((p) => p.license_type === "team"))) && (
            <TabsTrigger
              value="team"
              className="cursor-pointer flex items-center gap-2"
            >
              <Users className="size-4" />
              <span>Team</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="personal" className="space-y-10">
          <PersonalTab
            hasLifetimeAccess={hasLifetimeAccess}
            paginatedTemplates={paginatedTemplates}
            templateData={templateData}
            templatesPagination={templatesPagination}
            setTemplatesPagination={setTemplatesPagination}
            payments={payments}
            paginatedPayments={paginatedPayments}
            paymentsPagination={paymentsPagination}
            setPaymentsPagination={setPaymentsPagination}
            renderPagination={renderPagination}
          />
        </TabsContent>
        <TabsContent value="team" className="space-y-8">
          <TeamTab
            teamState={teamState}
            teamLoading={teamLoading}
            teamError={teamError}
            teamSuccess={teamSuccess}
            form={form}
            onSubmit={onSubmit}
            submitLoading={submitLoading}
            showConfirmDialog={showConfirmDialog}
            setShowConfirmDialog={setShowConfirmDialog}
            emailsToConfirm={emailsToConfirm}
            handleConfirmedSubmit={handleConfirmedSubmit}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PersonalTabProps {
  hasLifetimeAccess: boolean;
  paginatedTemplates: DisplayTemplate[];
  templateData: DisplayTemplate[];
  templatesPagination: PaginationState;
  setTemplatesPagination: (state: PaginationState) => void;
  payments: Payment[];
  paginatedPayments: Payment[];
  paymentsPagination: PaginationState;
  setPaymentsPagination: (state: PaginationState) => void;
  renderPagination: (
    total: number,
    paginationState: PaginationState,
    onChange: (state: PaginationState) => void,
  ) => React.ReactNode;
}

const PersonalTab = React.memo(
  ({
    hasLifetimeAccess,
    paginatedTemplates,
    templateData,
    templatesPagination,
    setTemplatesPagination,
    payments,
    paginatedPayments,
    paymentsPagination,
    setPaymentsPagination,
    renderPagination,
  }: PersonalTabProps) => {
    return (
      <>
        <section>
          <h2 className="text-xl font-semibold mb-4">
            {hasLifetimeAccess
              ? "All Available Templates"
              : "Your Templates & Licenses"}
          </h2>
          {paginatedTemplates.length > 0 ? (
            <Card className="border-dashed">
              <ScrollArea className="h-[400px] rounded-md">
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Template
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          {hasLifetimeAccess ? "Access Since" : "Purchase Date"}
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTemplates.map((template, index) => (
                        <tr
                          key={`${template.template_id}-${index}`}
                          className="border-b hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 flex items-center justify-center bg-primary/10 rounded-md">
                                <Package className="size-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {template.templates?.name || "Template"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {template.template_id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {template.purchase_date
                              ? format(
                                  new Date(template.purchase_date),
                                  "MMM d, yyyy",
                                )
                              : "Unknown"}
                          </td>
                          <td className="p-4 text-right">
                            <TemplateDownloadButton
                              templateId={template.template_id}
                              variant="ghost"
                              size="sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              {renderPagination(
                templateData.length,
                templatesPagination,
                setTemplatesPagination,
              )}
            </Card>
          ) : (
            <Card className="bg-muted/30 border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Package className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-2">
                  No templates purchased
                </h3>
                <p className="text-muted-foreground max-w-md text-center mb-6">
                  You haven't purchased any templates yet. Browse our collection
                  to find the perfect template for your project.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Billing History</h2>
          {payments.length > 0 ? (
            <Card className="border-dashed">
              <ScrollArea className="h-[400px] rounded-md">
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Product
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Date
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">
                          Amount
                        </th>
                        <th className="h-12 px-4 text-right align-middle font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 flex items-center justify-center bg-primary/10 rounded-md">
                                <CreditCard className="size-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {payment.product_type === "template"
                                    ? `Template: ${payment.product_id || "Unknown"}`
                                    : payment.product_type === "lifetime"
                                      ? `Lifetime Access (${payment.license_type || "Personal"})`
                                      : payment.product_type}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {payment.stripe_checkout_session_id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {payment.purchase_date
                              ? format(
                                  new Date(payment.purchase_date),
                                  "MMM d, yyyy",
                                )
                              : "Unknown"}
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${(payment.amount_paid || 0).toFixed(2)}
                          </td>
                          <td className="p-4 text-right">
                            <Badge
                              variant={
                                payment.payment_status === "completed"
                                  ? "success"
                                  : "secondary"
                              }
                            >
                              {payment.payment_status || "Unknown"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              {renderPagination(
                payments.length,
                paymentsPagination,
                setPaymentsPagination,
              )}
            </Card>
          ) : (
            <Card className="bg-muted/30 border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="size-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-2">No payment history</h3>
                <p className="text-muted-foreground max-w-md text-center">
                  You haven't made any purchases yet. Your payment history will
                  appear here once you buy templates.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </>
    );
  },
);

interface TeamTabProps {
  teamState: any;
  teamLoading: boolean;
  teamError: string | null;
  teamSuccess: string | null;
  form: UseFormReturn<InviteFormValues>;
  onSubmit: (values: InviteFormValues) => void;
  submitLoading: boolean;
  showConfirmDialog: boolean;
  setShowConfirmDialog: (open: boolean) => void;
  emailsToConfirm: string[];
  handleConfirmedSubmit: () => void;
}

const TeamTab = React.memo(
  ({
    teamState,
    teamLoading,
    teamError,
    teamSuccess,
    form,
    onSubmit,
    submitLoading,
    showConfirmDialog,
    setShowConfirmDialog,
    emailsToConfirm,
    handleConfirmedSubmit,
  }: TeamTabProps) => {
    if (teamLoading) {
      return (
        <div className="flex flex-col items-center space-y-4 py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading team information...</p>
        </div>
      );
    }

    if (!teamState) {
      return (
        <Card className="bg-muted/30 border border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full w-16 h-16 flex items-center justify-center bg-muted mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              No Team License Found
            </h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You don't have a team license. Purchase a team license to invite
              team members and collaborate.
            </p>
            <Button asChild>
              <a href="/pricing">View Pricing Options</a>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <>
        {teamError && (
          <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md">
            {teamError}
          </div>
        )}
        {teamSuccess && (
          <div className="bg-green-500/15 text-green-600 px-4 py-2 rounded-md">
            {teamSuccess}
          </div>
        )}

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>License Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">License Type</p>
                <p className="font-medium">Team License</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Seats</p>
                <p className="font-medium">{teamState.team?.max_seats || 0}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Available Seats</p>
                <p className="font-medium">
                  {teamState.team
                    ? teamState.team.max_seats - teamState.team.used_seats
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {teamState.role === "owner" && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <span>Add Team Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  ⚠️ Important Notice
                </h4>
                <p className="text-sm text-yellow-700">
                  Team member emails are permanent and cannot be changed or
                  removed. Please ensure you enter the correct email addresses.
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="emails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Addresses</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter email addresses (comma or new line separated)"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={submitLoading}>
                    Review & Add Members
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Team Members</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="font-medium text-yellow-600">
                ⚠️ This action is permanent and cannot be undone.
              </div>
              <div>
                Please verify these email addresses. Team members must use these
                exact email addresses for their accounts:
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <ul className="list-disc list-inside space-y-2">
                  {emailsToConfirm.map((email, index) => (
                    <li key={index} className="text-sm font-mono">
                      {email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter className="flex space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmedSubmit}
                disabled={submitLoading}
                className="bg-primary"
              >
                {submitLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Confirm & Add Members
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Team Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teamState.members.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-muted-foreground">No team members yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-md border border-dashed">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">
                          Email
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Status
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamState.members.map((member: any) => (
                        <tr
                          key={member.id}
                          className="border-t hover:bg-muted/50"
                        >
                          <td className="py-3 px-4 font-medium">
                            {member.email}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {member.user_id ? (
                                <>
                                  <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                  <span>Active</span>
                                </>
                              ) : (
                                <>
                                  <span className="flex h-2 w-2 rounded-full bg-yellow-500" />
                                  <span>Pending Registration</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {member.activation_date
                              ? new Date(
                                  member.activation_date,
                                ).toLocaleDateString()
                              : "Not joined yet"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </>
    );
  },
);
