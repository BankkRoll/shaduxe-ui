"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Download,
  FileText,
  Loader2,
  Package,
  RefreshCw,
  Shield,
  ShieldCheck,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TemplateDownloadButton from "../docs/template-download-button";

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
  status: "success" | "error" | "skipped";
  message: string;
}

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    templates: [],
    payments: [],
    downloads: [],
  });
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Team state
  const [teamState, setTeamState] = useState<any>(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);
  const [teamSuccess, setTeamSuccess] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailsToConfirm, setEmailsToConfirm] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Form for adding team members
  const inviteFormSchema = z.object({
    emails: z.string().min(1, {
      message: "At least one email address is required.",
    }),
  });

  const form = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      emails: "",
    },
  });

  // Pagination states
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
  const [downloadsPagination, setDownloadsPagination] =
    useState<PaginationState>({
      page: 1,
      pageSize: 5,
    });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const supabase = createClient();

      // Get current user
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      // Get user profile data
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", currentUser.id)
        .single();

      // Get user purchased templates
      const { data: templatesData } = await supabase
        .from("user_templates")
        .select(
          `
          *,
          templates:template_id (*)
        `,
        )
        .eq("user_id", currentUser.id);

      // Get payment history
      const { data: paymentsData } = await supabase
        .from("paid_users")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("purchase_date", { ascending: false });

      // Get download history
      const { data: downloadsData } = await supabase
        .from("template_downloads")
        .select(
          `
          *,
          templates:template_id (*)
        `,
        )
        .eq("user_id", currentUser.id)
        .order("download_date", { ascending: false });

      setUserData({
        profile: profileData || null,
        templates: templatesData || [],
        payments: paymentsData || [],
        downloads: downloadsData || [],
      });

      setLoading(false);
    };

    fetchUserData();
    fetchTeamData(); // Also fetch team data
  }, []);

  // Function to fetch team data
  const fetchTeamData = async () => {
    setTeamLoading(true);
    setTeamError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current user:", user);

      if (!user) {
        setTeamState(null);
        return;
      }

      // Use a more direct approach with a single query
      // This query bypasses joining the tables, which might be causing the recursion
      const { data: directTeamData, error: directTeamError } =
        await supabase.rpc("get_team_data_for_user", { user_id: user.id });

      if (directTeamError) {
        console.error("Direct team query error:", directTeamError);
        setTeamError("Failed to load team data");
        setTeamState(null);
        setTeamLoading(false);
        return;
      }

      if (directTeamData) {
        setTeamState(directTeamData);
      } else {
        setTeamState(null);
      }
    } catch (error) {
      console.error("Team data error:", error);
      setTeamError("Failed to load team data");
    } finally {
      setTeamLoading(false);
    }
  };

  // Function to submit team invites
  const onSubmit = async (values: z.infer<typeof inviteFormSchema>) => {
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

  // New function to handle final submission after confirmation
  const handleConfirmedSubmit = async () => {
    setSubmitLoading(true);
    setTeamError(null);
    setTeamSuccess(null);
    console.log("Starting submission process for emails:", emailsToConfirm);

    try {
      const supabase = createClient();

      // Get current user and team license
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current user for submission:", user);

      if (!user) {
        throw new Error("Not authenticated");
      }

      // Get team license directly - since RLS is now disabled
      const { data: teamLicense, error: licenseError } = await supabase
        .from("team_licenses")
        .select("*")
        .eq("owner_user_id", user.id)
        .single();

      console.log("Team license lookup:", { teamLicense, licenseError });

      if (licenseError) {
        console.error("License error:", licenseError);
        throw new Error(`No team license found: ${licenseError.message}`);
      }

      if (!teamLicense) {
        throw new Error("No team license found for your account");
      }

      // Check available seats
      if (
        teamLicense.used_seats + emailsToConfirm.length >
        teamLicense.max_seats
      ) {
        throw new Error(
          `Not enough seats available. You have ${teamLicense.max_seats - teamLicense.used_seats} seats available.`,
        );
      }

      let successCount = 0;
      const results: InviteResult[] = [];

      // Process each email
      for (const email of emailsToConfirm) {
        console.log(`Processing email: ${email}`);

        // Check if already a member
        const { data: existingMembers, error: memberCheckError } =
          await supabase
            .from("team_members")
            .select("*")
            .eq("team_license_id", teamLicense.id)
            .eq("email", email);

        console.log("Existing member check:", {
          existingMembers,
          memberCheckError,
        });

        if (existingMembers && existingMembers.length > 0) {
          results.push({
            email,
            status: "skipped",
            message: "Already a team member",
          });
          continue;
        }

        // In this simple approach, we'll just use the current user's data
        // If you're adding other users, proper email lookup would need server-side code
        let existingUser = null;

        // Check if the current user's email matches the invited email
        if (user.email === email) {
          existingUser = { user_id: user.id };
        }

        console.log("Existing user check:", {
          existingUser,
          currentUserEmail: user.email,
          invitedEmail: email,
        });

        // Add team member
        const { data: newMember, error: memberError } = await supabase
          .from("team_members")
          .insert({
            team_license_id: teamLicense.id,
            email: email,
            status: "active",
            user_id: existingUser?.user_id || null,
            invitation_date: new Date().toISOString(),
            activation_date: existingUser?.user_id
              ? new Date().toISOString()
              : null,
          })
          .select()
          .single();

        console.log("Insert member result:", { newMember, memberError });

        if (memberError) {
          console.error("Error adding team member:", memberError);
          results.push({
            email,
            status: "error",
            message: memberError.message || "Failed to add member",
          });
          continue;
        }

        // If user exists, update their profile
        if (existingUser?.user_id) {
          const { data: profileUpdate, error: profileError } = await supabase
            .from("user_profiles")
            .upsert({
              user_id: existingUser.user_id,
              has_lifetime_access: true,
              access_granted_date: new Date().toISOString(),
            });

          console.log("Profile update:", { profileUpdate, profileError });
        }

        results.push({
          email,
          status: "success",
          message: existingUser?.user_id
            ? "Added existing user"
            : "Invitation sent",
        });
        successCount++;
      }

      console.log("All members processed. Results:", results);

      // Update used seats count
      if (successCount > 0) {
        const { data: seatsUpdate, error: seatsError } = await supabase
          .from("team_licenses")
          .update({ used_seats: teamLicense.used_seats + successCount })
          .eq("id", teamLicense.id);

        console.log("Seats update:", { seatsUpdate, seatsError });

        if (seatsError) {
          console.error("Error updating seats:", seatsError);
        }
      }

      // Reset form and state
      form.reset();
      setShowConfirmDialog(false);
      setEmailsToConfirm([]);

      // Update UI with detailed results
      setTeamSuccess(
        `Successfully added ${successCount} team member(s). ${
          results.filter((r) => r.status === "skipped").length
        } already members.`,
      );

      // Refresh team data
      await fetchTeamData();
      console.log("Team data refreshed");
    } catch (error: any) {
      console.error("Error adding team members:", error);
      setTeamError(error.message || "Failed to add team members");
      setShowConfirmDialog(false); // Close dialog on error too
    } finally {
      setSubmitLoading(false);
      console.log("Submit process complete");
    }
  };

  // Pagination helpers
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

  const getPageCount = (total: number, pageSize: number) => {
    return Math.ceil(total / pageSize);
  };

  const renderPagination = (
    total: number,
    { page, pageSize }: PaginationState,
    onChange: (state: PaginationState) => void,
  ) => {
    const pageCount = getPageCount(total, pageSize);
    if (pageCount <= 1) return null;

    const { start, end } = getPaginatedData(Array(total), { page, pageSize });

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
                  className={cn(page === 1 && "pointer-events-none opacity-50")}
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
  };

  if (loading) {
    return (
      <div className="container min-h-screen py-10 space-y-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const { profile, templates, payments, downloads } = userData;

  // Calculate pagination values
  const { data: paginatedTemplates } = getPaginatedData(
    templates,
    templatesPagination,
  );
  const { data: paginatedPayments } = getPaginatedData(
    payments,
    paymentsPagination,
  );
  const { data: paginatedDownloads } = getPaginatedData(
    downloads,
    downloadsPagination,
  );

  return (
    <div className="container min-h-screen py-10 space-y-10 max-w-6xl mx-auto">
      {/* Profile Header */}
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
                {templates.length} Template{templates.length !== 1 ? "s" : ""}{" "}
                Purchased
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="size-4" />
              <span>
                {downloads.length} Download{downloads.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <Tabs variant="underline" defaultValue="personal" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger
            value="personal"
            className="cursor-pointer flex items-center gap-2"
          >
            <UserCircle className="size-4" />
            <span>Personal</span>
          </TabsTrigger>
          {/* TODO: Add team license check to only show team tab if user has a team license.... using a method that shows wether they ahve it or not form above */}
          <TabsTrigger
            value="team"
            className="cursor-pointer flex items-center gap-2"
          >
            <Users className="size-4" />
            <span>Team</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Dashboard Tab */}
        <TabsContent value="personal" className="space-y-10">
          {/* Templates Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Your Templates & Licenses
            </h2>

            {templates.length > 0 ? (
              <Card>
                <ScrollArea className="h-[400px] rounded-md border border-dashed ">
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Template
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Purchase Date
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">
                            Status
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTemplates.map((template) => (
                          <tr
                            key={template.id}
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
                              <Badge>Active</Badge>
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
                  templates.length,
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
                    You haven't purchased any templates yet. Browse our
                    collection to find the perfect template for your project.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Billing History Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Billing History</h2>

            {payments.length > 0 ? (
              <Card>
                <ScrollArea className="h-[400px] rounded-md border border-dashed ">
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
                                        ? "Lifetime Access"
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
                  <h3 className="font-medium text-lg mb-2">
                    No payment history
                  </h3>
                  <p className="text-muted-foreground max-w-md text-center">
                    You haven't made any purchases yet. Your payment history
                    will appear here once you buy templates.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Recent Downloads Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Downloads</h2>

            {downloads.length > 0 ? (
              <Card>
                <ScrollArea className="h-[400px] rounded-md border border-dashed ">
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Template
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium">
                            Download Date
                          </th>
                          <th className="h-12 px-4 text-right align-middle font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedDownloads.map((download) => (
                          <tr
                            key={download.id}
                            className="border-b hover:bg-muted/30 transition-colors"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-primary/10 rounded-md">
                                  <FileText className="size-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {download.templates?.name ||
                                      download.template_id}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: {download.template_id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {download.download_date
                                ? format(
                                    new Date(download.download_date),
                                    "MMM d, yyyy h:mm a",
                                  )
                                : "Unknown"}
                            </td>
                            <td className="p-4 text-right">
                              <TemplateDownloadButton
                                templateId={download.template_id}
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
                  downloads.length,
                  downloadsPagination,
                  setDownloadsPagination,
                )}
              </Card>
            ) : (
              <Card className="bg-muted/30 border border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Download className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">No downloads yet</h3>
                  <p className="text-muted-foreground max-w-md text-center">
                    You haven't downloaded any templates yet. After purchasing,
                    you can download your templates here.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        </TabsContent>

        {/* Team Dashboard Tab */}
        <TabsContent value="team" className="space-y-8">
          {teamLoading ? (
            <div className="flex flex-col items-center space-y-4 py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Loading team information...
              </p>
            </div>
          ) : !teamState ? (
            <Card className="bg-muted/30 border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-muted mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  No Team License Found
                </h2>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You don't have a team license. Purchase a team license to
                  invite team members and collaborate.
                </p>
                <Button asChild>
                  <a href="/pricing">View Pricing Options</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
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

              {/* License Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>License Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        License Type
                      </p>
                      <p className="font-medium">Team License</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Total Seats
                      </p>
                      <p className="font-medium">
                        {teamState.team?.max_seats || 0}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Available Seats
                      </p>
                      <p className="font-medium">
                        {teamState.team
                          ? teamState.team.max_seats - teamState.team.used_seats
                          : 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add Team Members */}
              {teamState.role === "owner" && (
                <Card>
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
                        Team member emails are permanent and cannot be changed
                        or removed. Please ensure you enter the correct email
                        addresses that your team members will use for their
                        accounts.
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

              {/* Confirmation Dialog */}
              <Dialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm Team Members</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="font-medium text-yellow-600">
                      ⚠️ This action is permanent and cannot be undone.
                    </div>
                    <div>
                      Please verify these email addresses. Team members must use
                      these exact email addresses for their accounts:
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

              {/* Team Members List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Team Members</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {teamState.members.length === 0 ? (
                    <div className="text-center p-6">
                      <p className="text-muted-foreground">
                        No team members yet.
                      </p>
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
                                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                        <span>Active</span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
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
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchTeamData}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Team Data
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
