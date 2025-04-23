"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-3">Last updated: April 2025</p>
        </div>

        <nav className="space-y-1 text-sm pr-4">
          <NavItem
            href="#introduction"
            isActive={activeSection === "introduction"}
          >
            Introduction
          </NavItem>
          <NavItem
            href="#information-collection"
            isActive={activeSection === "information-collection"}
          >
            Information Collection
          </NavItem>
          <NavSection
            title="Types of Data"
            href="#types-of-data"
            isActive={
              activeSection === "types-of-data" ||
              activeSection.startsWith("account-data") ||
              activeSection.startsWith("payment-data") ||
              activeSection.startsWith("usage-data") ||
              activeSection.startsWith("technical-data")
            }
          >
            <NavItem
              href="#account-data"
              indent
              isActive={activeSection === "account-data"}
            >
              Account Information
            </NavItem>
            <NavItem
              href="#payment-data"
              indent
              isActive={activeSection === "payment-data"}
            >
              Payment Data
            </NavItem>
            <NavItem
              href="#usage-data"
              indent
              isActive={activeSection === "usage-data"}
            >
              Usage Data
            </NavItem>
            <NavItem
              href="#technical-data"
              indent
              isActive={activeSection === "technical-data"}
            >
              Technical Data
            </NavItem>
          </NavSection>
          <NavItem href="#data-usage" isActive={activeSection === "data-usage"}>
            How We Use Your Data
          </NavItem>
          <NavItem
            href="#data-storage"
            isActive={activeSection === "data-storage"}
          >
            Data Storage & Security
          </NavItem>
          <NavItem
            href="#data-sharing"
            isActive={activeSection === "data-sharing"}
          >
            Data Sharing & Disclosure
          </NavItem>
          <NavItem href="#cookies" isActive={activeSection === "cookies"}>
            Cookies & Tracking
          </NavItem>
          <NavItem
            href="#user-rights"
            isActive={activeSection === "user-rights"}
          >
            Your Rights
          </NavItem>
          <NavItem
            href="#data-protection"
            isActive={activeSection === "data-protection"}
          >
            Data Protection Measures
          </NavItem>
          <NavItem
            href="#childrens-privacy"
            isActive={activeSection === "childrens-privacy"}
          >
            Children's Privacy
          </NavItem>
          <NavItem
            href="#international-transfers"
            isActive={activeSection === "international-transfers"}
          >
            International Transfers
          </NavItem>
          <NavItem href="#changes" isActive={activeSection === "changes"}>
            Changes to This Policy
          </NavItem>
          <NavItem href="#contact" isActive={activeSection === "contact"}>
            Contact Us
          </NavItem>
        </nav>
      </div>

      <div className="p-8 md:p-12">
        <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
          <section id="introduction" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Introduction
            </h2>
            <p className="text-muted-foreground">
              At Shaduxe UI ("we", "our", or "us"), we are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy outlines how we collect, use,
              disclose, and safeguard your information when you visit our
              website, use our services, or interact with us in any way.
            </p>
            <p className="text-muted-foreground">
              We take your privacy seriously and have developed this policy to
              help you understand how we handle your data. Please read this
              Privacy Policy carefully. By accessing or using our services, you
              acknowledge that you have read, understood, and agree to be bound
              by the terms of this Privacy Policy.
            </p>
          </section>

          <section id="information-collection" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Information Collection
            </h2>
            <p className="text-muted-foreground">
              We collect several types of information for various purposes to
              provide and improve our services to you. The information we
              collect depends on how you interact with our services and the
              features you use.
            </p>
          </section>

          <section id="types-of-data" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Types of Data We Collect
            </h2>

            <div id="account-data" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">
                Account Information
              </h3>
              <p className="text-muted-foreground">
                When you create an account with Shaduxe UI, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Email address</li>
                <li>Name and contact information</li>
                <li>Authentication credentials</li>
                <li>Account preferences and settings</li>
                <li>Profile information you choose to provide</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div id="payment-data" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Payment Data</h3>
              <p className="text-muted-foreground">
                For processing payments, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Payment method details</li>
                <li>Billing name and address</li>
                <li>Transaction history</li>
                <li>Purchase records and license information</li>
                <li>Subscription status and history</li>
                <li>Tax information where required by law</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                <strong>Note:</strong> We do not store your full credit card
                details on our servers. All payment processing is handled
                securely by Stripe, our trusted payment processor, which
                maintains PCI DSS compliance.
              </p>
            </div>

            <div id="usage-data" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Usage Data</h3>
              <p className="text-muted-foreground">
                We automatically collect information about how you use our
                services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Products and features accessed</li>
                <li>Templates downloaded or accessed</li>
                <li>Actions taken within the platform</li>
                <li>Interaction patterns and user behavior</li>
                <li>Feature usage statistics</li>
                <li>Time spent using various features</li>
                <li>Content preferences</li>
              </ul>
            </div>

            <div id="technical-data" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-semibold mb-3">Technical Data</h3>
              <p className="text-muted-foreground">
                When you access our services, we automatically collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>IP address</li>
                <li>Device information (type, model, operating system)</li>
                <li>Browser type and version</li>
                <li>Access times and dates</li>
                <li>Pages viewed and navigation patterns</li>
                <li>Referral sources</li>
                <li>Network information</li>
                <li>Performance and error data</li>
              </ul>
            </div>
          </section>

          <section id="data-usage" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              How We Use Your Data
            </h2>
            <p className="text-muted-foreground">
              We use the collected information for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Providing and maintaining our services</li>
              <li>Processing transactions and managing subscriptions</li>
              <li>Verifying your identity and preventing fraud</li>
              <li>Sending important service notifications and updates</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Improving our products, services, and user experience</li>
              <li>Analyzing usage patterns to optimize performance</li>
              <li>Customizing content and features based on preferences</li>
              <li>Enforcing our terms of service and protecting our rights</li>
              <li>Complying with legal obligations and regulations</li>
            </ul>
          </section>

          <section id="data-storage" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Data Storage & Security
            </h2>
            <p className="text-muted-foreground">
              We implement robust technical and organizational measures to
              protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. Our security measures
              include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Encryption of data in transit (TLS/SSL) and at rest</li>
              <li>Secure authentication</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Role-based access controls for internal systems</li>
              <li>Data backup and disaster recovery procedures</li>
              <li>Employee security training and confidentiality agreements</li>
              <li>Secure payment processing through Stripe</li>
              <li>Continuous monitoring for suspicious activities</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              While we strive to use commercially acceptable means to protect
              your personal data, no method of transmission over the Internet or
              method of electronic storage is 100% secure. We cannot guarantee
              its absolute security but are committed to implementing best
              practices to safeguard your information.
            </p>
          </section>

          <section id="data-sharing" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Data Sharing & Disclosure
            </h2>
            <p className="text-muted-foreground">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                provide services on our behalf, such as Stripe ,Supabase, or
                other third-party services we use.
              </li>
              <li>
                <strong>Business Partners:</strong> Trusted partners who assist
                us in operating our website, conducting our business, or serving
                our users.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required to comply
                with applicable laws, regulations, legal processes, or
                enforceable governmental requests.
              </li>
              <li>
                <strong>Protection of Rights:</strong> When necessary to enforce
                our terms of service, protect our rights, privacy, safety, or
                property, or that of our users or others.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, reorganization, or sale of assets, in which
                case personal data would be among the assets transferred.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We do not sell your personal information to third parties for
              marketing purposes.
            </p>
          </section>

          <section id="cookies" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Cookies & Tracking
            </h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to track activity
              on our service and store certain information. Cookies are files
              with a small amount of data that may include an anonymous unique
              identifier.
            </p>
            <p className="text-muted-foreground">Types of cookies we use:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Essential Cookies:</strong> Required for the operation
                of our website and cannot be switched off.
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> Allow us to
                recognize and count the number of visitors and see how visitors
                move around our website.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Enable the website to
                provide enhanced functionality and personalization.
              </li>
              <li>
                <strong>Targeting Cookies:</strong> Record your visit to our
                website, the pages you have visited, and the links you have
                followed.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section id="user-rights" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Your Rights
            </h2>
            <p className="text-muted-foreground">
              Depending on your location, you may have certain rights regarding
              your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Access:</strong> The right to request copies of your
                personal data.
              </li>
              <li>
                <strong>Rectification:</strong> The right to request correction
                of inaccurate data.
              </li>
              <li>
                <strong>Erasure:</strong> The right to request deletion of your
                data under certain conditions.
              </li>
              <li>
                <strong>Restriction:</strong> The right to request restriction
                of processing of your data.
              </li>
              <li>
                <strong>Data Portability:</strong> The right to request transfer
                of your data to another organization.
              </li>
              <li>
                <strong>Objection:</strong> The right to object to processing of
                your data.
              </li>
              <li>
                <strong>Withdraw Consent:</strong> The right to withdraw consent
                where processing is based on consent.
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              To exercise any of these rights, please contact us using the
              information provided in the "Contact Us" section.
            </p>
          </section>

          <section id="data-protection" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Data Protection Measures
            </h2>
            <p className="text-muted-foreground">
              We have implemented appropriate technical and organizational
              measures to ensure a level of security appropriate to the risk,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Regular security audits and vulnerability assessments</li>
              <li>Implementation of security patches and updates</li>
              <li>Secure development practices and code reviews</li>
              <li>Data minimization and purpose limitation principles</li>
              <li>Access logs and monitoring systems</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section id="childrens-privacy" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground">
              Our services are not intended for use by children under the age of
              18. We do not knowingly collect personally identifiable
              information from children under 18. If you are a parent or
              guardian and you believe your child has provided us with personal
              information, please contact us so that we can take necessary
              actions.
            </p>
          </section>

          <section id="international-transfers" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              International Transfers
            </h2>
            <p className="text-muted-foreground">
              Your information may be transferred to — and maintained on —
              computers located outside of your state, province, country, or
              other governmental jurisdiction where the data protection laws may
              differ from those in your jurisdiction.
            </p>
            <p className="text-muted-foreground">
              If you are located outside the United States and choose to provide
              information to us, please note that we transfer the data,
              including personal data, to the United States and process it
              there. Your consent to this Privacy Policy followed by your
              submission of such information represents your agreement to that
              transfer.
            </p>
          </section>

          <section id="changes" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date at the top of this page.
            </p>
            <p className="text-muted-foreground">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </section>

          <section id="contact" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us:
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
