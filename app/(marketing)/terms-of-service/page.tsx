"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || "";
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-[350px_1fr] grid-cols-1">
      <div className="p-8 min-h-screen lg:sticky top-0 overflow-y-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mt-3">Last updated: April 2025</p>
        </div>

        <nav className="space-y-1 text-sm pr-4">
          <NavItem href="#acceptance" isActive={activeSection === "acceptance"}>
            Acceptance of Terms
          </NavItem>
          <NavItem
            href="#definitions"
            isActive={activeSection === "definitions"}
          >
            Definitions
          </NavItem>
          <NavItem href="#account" isActive={activeSection === "account"}>
            Account Registration
          </NavItem>
          <NavSection
            title="License Terms"
            href="#license"
            isActive={
              activeSection === "license" ||
              activeSection === "template-license" ||
              activeSection === "team-license" ||
              activeSection === "restrictions"
            }
          >
            <NavItem
              href="#template-license"
              indent
              isActive={activeSection === "template-license"}
            >
              Template License
            </NavItem>
            <NavItem
              href="#team-license"
              indent
              isActive={activeSection === "team-license"}
            >
              Team License
            </NavItem>
            <NavItem
              href="#restrictions"
              indent
              isActive={activeSection === "restrictions"}
            >
              Restrictions
            </NavItem>
          </NavSection>
          <NavSection
            title="Payment Terms"
            href="#payment"
            isActive={
              activeSection === "payment" ||
              activeSection === "pricing" ||
              activeSection === "billing" ||
              activeSection === "refunds"
            }
          >
            <NavItem
              href="#pricing"
              indent
              isActive={activeSection === "pricing"}
            >
              Pricing
            </NavItem>
            <NavItem
              href="#billing"
              indent
              isActive={activeSection === "billing"}
            >
              Billing
            </NavItem>
            <NavItem
              href="#refunds"
              indent
              isActive={activeSection === "refunds"}
            >
              Refunds
            </NavItem>
          </NavSection>
          <NavItem
            href="#user-content"
            isActive={activeSection === "user-content"}
          >
            User Content
          </NavItem>
          <NavItem href="#prohibited" isActive={activeSection === "prohibited"}>
            Prohibited Activities
          </NavItem>
          <NavItem
            href="#intellectual-property"
            isActive={activeSection === "intellectual-property"}
          >
            Intellectual Property
          </NavItem>
          <NavItem
            href="#third-party"
            isActive={activeSection === "third-party"}
          >
            Third-Party Services
          </NavItem>
          <NavItem href="#disclaimer" isActive={activeSection === "disclaimer"}>
            Disclaimer of Warranties
          </NavItem>
          <NavItem href="#limitation" isActive={activeSection === "limitation"}>
            Limitation of Liability
          </NavItem>
          <NavItem
            href="#indemnification"
            isActive={activeSection === "indemnification"}
          >
            Indemnification
          </NavItem>
          <NavItem
            href="#termination"
            isActive={activeSection === "termination"}
          >
            Termination
          </NavItem>
          <NavItem href="#disputes" isActive={activeSection === "disputes"}>
            Dispute Resolution
          </NavItem>
          <NavItem href="#general" isActive={activeSection === "general"}>
            General Provisions
          </NavItem>
          <NavItem href="#changes" isActive={activeSection === "changes"}>
            Changes to Terms
          </NavItem>
          <NavItem href="#contact" isActive={activeSection === "contact"}>
            Contact Information
          </NavItem>
        </nav>
      </div>

      <div className="p-8 md:p-12">
        <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
          <section id="acceptance" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing or using Shaduxe UI's website, products, or services
              ("Services"), you agree to be bound by these Terms of Service
              ("Terms"), which constitute a legally binding agreement between
              you and Shaduxe UI ("we," "us," or "our"). If you do not agree to
              these Terms, you must not access or use our Services.
            </p>
            <p className="text-muted-foreground">
              These Terms apply to all visitors, users, and others who access or
              use the Services. By using the Services, you represent and warrant
              that you have the legal capacity to enter into these Terms and
              comply with them.
            </p>
          </section>

          <section id="definitions" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Definitions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>"Services"</strong> means the Shaduxe UI website,
                templates, components, and any other products or services
                offered by us.
              </li>
              <li>
                <strong>"User"</strong> means an individual who accesses or uses
                our Services.
              </li>
              <li>
                <strong>"Account"</strong> means a unique account created for
                you to access our Services.
              </li>
              <li>
                <strong>"License"</strong> means the right to use the templates
                and components offered through our Services subject to the terms
                specified in these Terms.
              </li>
              <li>
                <strong>"User Content"</strong> means any content that you
                create, upload, or modify using our Services.
              </li>
            </ul>
          </section>

          <section id="account" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Account Registration
            </h2>
            <p className="text-muted-foreground">
              To access certain features of our Services, you may be required to
              register for an account. When registering for an account, you
              agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Provide accurate, current, and complete information about
                yourself as prompted by the registration form.
              </li>
              <li>
                Maintain and promptly update your account information to keep it
                accurate, current, and complete.
              </li>
              <li>
                Be solely responsible for safeguarding your account credentials.
              </li>
              <li>
                Be fully responsible for all activities that occur under your
                account.
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account or
                any other breach of security.
              </li>
              <li>
                Ensure that you log out from your account at the end of each
                session when using a shared computer.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              You must be at least 18 years old to create an account. By
              creating an account, you represent and warrant that you are 18
              years of age or older. We reserve the right to terminate or
              suspend your account at any time for any reason without notice.
            </p>
          </section>

          <section id="license" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              License Terms
            </h2>
            <p className="text-muted-foreground">
              Subject to these Terms, we grant you a limited, non-exclusive,
              non-transferable license to use our Services as described below.
              All rights not expressly granted to you are reserved by us and our
              licensors.
            </p>

            <div id="template-license" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Template License</h3>
              <p className="text-muted-foreground">
                When you purchase an individual template, you receive:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  A non-exclusive, worldwide, perpetual right to use the
                  template in your projects.
                </li>
                <li>
                  The right to modify and customize the template for your
                  specific needs.
                </li>
                <li>
                  The right to use the template in multiple projects or
                  applications you develop.
                </li>
                <li>
                  Access to template updates for the specific template
                  purchased.
                </li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Each template is licensed for use by a single user unless you
                have purchased a Team License.
              </p>
            </div>

            <div id="team-license" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Team License</h3>
              <p className="text-muted-foreground">
                When you purchase a Team License, you receive:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  All the rights included in the individual template license.
                </li>
                <li>
                  The ability to share access to templates with multiple team
                  members (up to the number of seats purchased).
                </li>
                <li>
                  Centralized billing and license management through a team
                  administrator account.
                </li>
                <li>Team collaboration features for shared templates.</li>
                <li>Priority customer support for all team members.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                The Team License allows for a specific number of users (seats)
                to access and use the templates. Adding additional users beyond
                the purchased seat limit requires upgrading your license.
              </p>
            </div>

            <div id="restrictions" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">
                License Restrictions
              </h3>
              <p className="text-muted-foreground">
                Regardless of the license type, you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Redistribute, resell, lease, license, sub-license, or offer
                  our templates to any third party.
                </li>
                <li>
                  Include our templates in a product offered for sale where the
                  primary value of the product is the template itself.
                </li>
                <li>
                  Use our templates to create derivative templates, UI kits, or
                  design systems to be sold or distributed.
                </li>
                <li>
                  Claim ownership or authorship of our templates or remove any
                  copyright or attribution notices.
                </li>
                <li>
                  Use our templates in any way that violates applicable laws or
                  regulations.
                </li>
              </ul>
            </div>
          </section>

          <section id="payment" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Payment Terms
            </h2>
            <p className="text-muted-foreground">
              Your use of certain features of our Services may require payment.
              The following terms apply to all payments made through our
              Services:
            </p>

            <div id="pricing" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Pricing</h3>
              <p className="text-muted-foreground">
                All prices displayed on our website are in US dollars and are
                exclusive of any applicable taxes unless otherwise stated. We
                reserve the right to change our prices at any time. Any price
                changes will not affect already purchased licenses.
              </p>
            </div>

            <div id="billing" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Billing</h3>
              <p className="text-muted-foreground">
                We use Stripe as our payment processor. By making a purchase,
                you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete billing information.</li>
                <li>
                  Authorize us to charge your payment method for the full amount
                  of your purchase.
                </li>
                <li>Keep your payment information up-to-date.</li>
                <li>
                  Pay all fees and charges incurred through your account at the
                  rates in effect when the charges were incurred.
                </li>
              </ul>
              <p className="text-muted-foreground mt-3">
                For subscription-based licenses, your payment method will be
                automatically charged at the beginning of each billing period.
                You can cancel your subscription at any time, but no refunds
                will be issued for partial billing periods.
              </p>
            </div>

            <div id="refunds" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Refund Policy</h3>
              <p className="text-muted-foreground">
                Due to the digital nature of our products:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  All sales are final and non-refundable once the digital
                  content has been delivered or access has been granted.
                </li>
                <li>
                  Exceptions may be made at our sole discretion in cases of
                  technical issues that prevent proper access to or use of the
                  purchased templates.
                </li>
                <li>
                  Refund requests must be submitted within 14 days of purchase
                  and will be evaluated on a case-by-case basis.
                </li>
              </ul>
            </div>
          </section>

          <section id="user-content" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              User Content
            </h2>
            <p className="text-muted-foreground">
              Our Services may allow you to create, upload, store, share, or
              publish content. You retain all rights to your User Content, but
              you grant us a worldwide, non-exclusive, royalty-free license to
              use, reproduce, modify, adapt, publish, translate, and distribute
              your User Content in connection with providing and improving our
              Services.
            </p>
            <p className="text-muted-foreground">
              You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                You own or have obtained all necessary rights to your User
                Content.
              </li>
              <li>
                Your User Content does not violate any third-party rights,
                including intellectual property rights and privacy rights.
              </li>
              <li>
                Your User Content does not violate any applicable laws or
                regulations.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We reserve the right to remove any User Content that violates
              these Terms or that we find objectionable for any reason, without
              prior notice.
            </p>
          </section>

          <section id="prohibited" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Prohibited Activities
            </h2>
            <p className="text-muted-foreground">
              You agree not to engage in any of the following prohibited
              activities:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Violating any laws, regulations, or third-party rights.</li>
              <li>
                Using our Services to distribute malware, viruses, or other
                harmful code.
              </li>
              <li>
                Attempting to gain unauthorized access to our Services, other
                users' accounts, or our systems.
              </li>
              <li>
                Using our Services to send unsolicited communications or
                advertisements.
              </li>
              <li>
                Impersonating any person or entity, or falsely stating or
                misrepresenting your affiliation with a person or entity.
              </li>
              <li>
                Interference with or disruption of our Services or servers.
              </li>
              <li>
                Automated or systematic data collection, extraction, or scraping
                without our prior consent.
              </li>
              <li>
                Reverse engineering or decompiling any part of our Services.
              </li>
              <li>
                Any action that places an unreasonable or disproportionately
                large load on our infrastructure.
              </li>
            </ul>
          </section>

          <section id="intellectual-property" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Intellectual Property Rights
            </h2>
            <p className="text-muted-foreground">
              All templates, components, code, design elements, documentation,
              and other materials provided through our Services are protected by
              intellectual property laws and remain the exclusive property of
              Shaduxe UI or our licensors. Except for the licenses explicitly
              granted in these Terms, no other rights or licenses are granted.
            </p>
            <p className="text-muted-foreground">
              The Shaduxe UI name, logo, and all related names, logos, product
              and service names, designs, and slogans are trademarks of Shaduxe
              UI or our affiliates. You may not use such marks without our prior
              written permission.
            </p>
          </section>

          <section id="third-party" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground">
              Our Services may integrate with or contain links to third-party
              websites, services, or resources. We are not responsible for the
              content, privacy policies, or practices of any third-party
              websites or services. You acknowledge and agree that we shall not
              be responsible or liable for any damage or loss caused by or in
              connection with the use of any such third-party websites,
              services, or resources.
            </p>
            <p className="text-muted-foreground">
              Our Services use Stripe for payment processing and Supabase for
              user authentication and database services. Your use of these
              services is subject to their respective terms of service and
              privacy policies.
            </p>
          </section>

          <section id="disclaimer" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground">
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT
              NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-muted-foreground">WE DO NOT WARRANT THAT:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                THE SERVICES WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE
                AT ANY PARTICULAR TIME OR LOCATION;
              </li>
              <li>ANY ERRORS OR DEFECTS WILL BE CORRECTED;</li>
              <li>
                THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS;
              </li>
              <li>
                THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS.
              </li>
            </ul>
          </section>

          <section id="limitation" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SHADUXE
              UI, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR
              AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
              LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
              RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE
                SERVICES;
              </li>
              <li>
                ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;
              </li>
              <li>ANY CONTENT OBTAINED FROM THE SERVICES; AND</li>
              <li>
                UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR
                CONTENT.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED
              THE AMOUNT PAID BY YOU TO US DURING THE TWELVE (12) MONTHS
              PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
            </p>
          </section>

          <section id="indemnification" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Indemnification
            </h2>
            <p className="text-muted-foreground">
              You agree to defend, indemnify, and hold harmless Shaduxe UI, its
              directors, employees, partners, agents, suppliers, and affiliates
              from and against any claims, liabilities, damages, judgments,
              awards, losses, costs, expenses, or fees (including reasonable
              attorneys' fees) arising out of or relating to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your violation of these Terms;</li>
              <li>Your User Content;</li>
              <li>Your use of our Services; or</li>
              <li>Your violation of any rights of a third party.</li>
            </ul>
          </section>

          <section id="termination" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Termination
            </h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and access to our
              Services immediately, without prior notice or liability, for any
              reason whatsoever, including, without limitation, if you breach
              these Terms.
            </p>
            <p className="text-muted-foreground">Upon termination:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your right to use the Services will immediately cease;</li>
              <li>
                We may delete or deactivate your account and all related
                information and files;
              </li>
              <li>
                Any licenses granted to you will continue in accordance with
                their terms, unless terminated for breach of these Terms.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              All provisions of these Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity,
              and limitations of liability.
            </p>
          </section>

          <section id="disputes" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Dispute Resolution
            </h2>
            <p className="text-muted-foreground">
              If you have any concerns or disputes about our Services, you agree
              to first try to resolve the dispute informally by contacting us.
              If we are unable to resolve the dispute informally, we both agree
              to resolve any claim, dispute, or controversy arising out of or in
              connection with these Terms through binding arbitration.
            </p>
            <p className="text-muted-foreground">
              The arbitration will be conducted by a single arbitrator in
              accordance with the rules of the American Arbitration Association.
              The arbitration shall be conducted in English and the arbitral
              decision may be enforced in any court.
            </p>
          </section>

          <section id="general" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              General Provisions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Entire Agreement:</strong> These Terms constitute the
                entire agreement between you and us regarding our Services and
                supersede any prior agreements.
              </li>
              <li>
                <strong>Waiver:</strong> No waiver of any term of these Terms
                shall be deemed a further or continuing waiver of such term or
                any other term.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms
                is held to be invalid or unenforceable, the remaining provisions
                shall continue in full force and effect.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign or transfer
                these Terms or your rights under these Terms without our prior
                written consent.
              </li>
              <li>
                <strong>Governing Law:</strong> These Terms shall be governed by
                the laws of [Jurisdiction], without regard to its conflict of
                law principles.
              </li>
              <li>
                <strong>Force Majeure:</strong> We will not be liable for any
                failure or delay in performance resulting from causes beyond our
                reasonable control.
              </li>
            </ul>
          </section>

          <section id="changes" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will
              provide notice of any material changes by posting the updated
              Terms on our website and updating the "Last updated" date at the
              top of these Terms.
            </p>
            <p className="text-muted-foreground">
              Your continued use of our Services after such modifications
              constitutes your acceptance of the modified Terms. If you do not
              agree to the modified Terms, you must stop using our Services.
            </p>
          </section>

          <section id="contact" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Contact Information
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>By email: support@shaduxe.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  children,
  indent = false,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  indent?: boolean;
  isActive?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "block py-2 hover:text-primary transition-colors",
        indent ? "pl-4" : "",
        isActive ? "text-primary font-medium" : "text-muted-foreground",
      )}
    >
      {children}
    </a>
  );
}

function NavSection({
  title,
  href,
  children,
  isActive = false,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <div className="space-y-1">
      <a
        href={href}
        className={cn(
          "block py-2 hover:text-primary transition-colors",
          isActive ? "text-primary font-medium" : "text-muted-foreground",
        )}
      >
        {title}
      </a>
      {children}
    </div>
  );
}
