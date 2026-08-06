import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | The Maze",
  description: "Privacy Policy for The Maze mobile game.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-x-hidden bg-[#030805]">
      <section className="jungle-section relative isolate px-4 pb-16 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12">
        <Image
          src="/images/section-pattern.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover opacity-72"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(223,151,47,0.2),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.78),rgba(2,8,5,0.62)_38%,rgba(0,0,0,0.94))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.72)_42%,transparent_100%)] sm:h-64" />

        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <Image
              src="/images/logo_512x512.png"
              alt="The Maze Logo"
              width={512}
              height={512}
              className="mx-auto h-auto w-28 drop-shadow-[0_20px_46px_rgba(0,0,0,0.65)] sm:w-40"
              priority
            />
            <h1 className="mt-6 font-anton text-[clamp(2.7rem,10vw,6.6rem)] leading-[0.9] text-[#f4ead3] hero-title">
              Privacy Policy
            </h1>
            <div className="game-info-divider mx-auto mt-6" />
            <p className="mt-6 font-poets text-base text-[#d9c987] sm:text-lg">
              Last updated: August 2, 2026
            </p>
          </div>

          <article className="policy-content game-info-card mt-10">
            <p>
              This Privacy Policy explains how <strong>The Maze</strong> (&quot;we&quot;,
              &quot;our&quot;, &quot;us&quot;) collects, uses, and protects information when
              you use our mobile game (the &quot;App&quot;).
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
              <li>
                <strong>Account information:</strong> When you sign in with Google or
                Apple, we receive your name, email address, and a unique account
                identifier associated with your social login, so we can create your
                leaderboard profile.
              </li>
              <li>
                <strong>Gameplay data:</strong> Your scores, distance records, and run
                history, used to power the leaderboard (daily, weekly, monthly rankings).
              </li>
              <li>
                <strong>Device information:</strong> Device identifiers, operating system
                version, and general device data collected automatically by standard mobile
                SDKs, used for app functionality, security, and analytics.
              </li>
              <li>
                <strong>Usage and analytics data:</strong> App interactions, session
                length, and crash/performance data, collected via analytics tools to help
                us improve the game.
              </li>
              <li>
                <strong>Advertising data:</strong> Our ad network may collect device
                identifiers and usage data to serve and measure advertisements. See Section
                4 below.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To create and maintain your leaderboard account and display rankings</li>
              <li>To operate, maintain, and improve the App</li>
              <li>To detect, prevent, and address technical issues or cheating</li>
              <li>To serve advertisements and measure their performance</li>
              <li>To analyze usage trends and app performance</li>
            </ul>

            <h2>3. Sign-In with Google / Apple</h2>
            <p>
              We use Google Sign-In and Sign in with Apple solely to authenticate you and
              create your leaderboard username. We do not access your contacts, files, or
              other account data beyond your basic profile (name and email).
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              The App uses the following third-party services, which may collect or process
              information on our behalf:
            </p>
            <ul>
              <li>
                <strong>PlayFab (Microsoft)</strong> - our backend service provider.
                PlayFab stores your account data, gameplay data, and leaderboard scores on
                our behalf, and provides analytics on app usage and performance.
              </li>
              <li>
                <strong>Advertising networks</strong> (e.g., Google AdMob) - to serve
                in-app ads and measure ad performance
              </li>
            </ul>
            <p>These third parties process data under their own privacy policies:</p>
            <ul>
              <li>
                <a href="https://www.playfab.com/privacy-policy/" target="_blank" rel="noreferrer">
                  PlayFab Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noreferrer">
                  Microsoft Privacy Statement
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noreferrer">
                  Google AdMob Privacy &amp; Terms
                </a>
              </li>
            </ul>

            <h2>5. Tracking &amp; App Tracking Transparency (iOS)</h2>
            <p>
              On iOS devices, if our advertising partners use your device&apos;s
              Advertising Identifier (IDFA) to track your activity across other
              companies&apos; apps and websites, we will request your permission via
              Apple&apos;s App Tracking Transparency framework before any such tracking
              occurs. You can change this permission at any time in{" "}
              <strong>Settings &gt; Privacy &amp; Security &gt; Tracking</strong>.
            </p>

            <h2>6. Data Sharing</h2>
            <p>We do not sell your personal information. We only share data with:</p>
            <ul>
              <li>Service providers (analytics, advertising, authentication) as described above</li>
              <li>Authorities, if required by law</li>
            </ul>

            <h2>7. Data Retention &amp; Account Deletion</h2>
            <p>
              We retain your account and gameplay data for as long as your account is
              active. You can request deletion of your account and associated data at any
              time via our in-app/website deletion tool:
            </p>
            <p>
              <a href="https://www.mazerunnergames.com/delete-account" target="_blank" rel="noreferrer">
                https://www.mazerunnergames.com/delete-account
              </a>
            </p>
            <p>
              Upon request, we will delete your account information and leaderboard data
              within a reasonable timeframe, except where retention is required for legal
              or security purposes.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              The App is not directed at children under 13 (or the relevant minimum age in
              your country), and we do not knowingly collect personal information from
              children. If you believe a child has provided us with personal information,
              please contact us so we can delete it.
            </p>

            <h2>9. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your
              information. However, no method of transmission or storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            <h2>10. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, or delete
              your personal data, or to object to certain processing. To exercise these
              rights, contact us using the details below.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted
              on this page with an updated &quot;Last updated&quot; date.
            </p>

            <h2>12. Contact Us</h2>
            <div className="rounded-lg border border-[#8f662d]/45 bg-[#061008]/72 p-4">
              <p>If you have questions about this Privacy Policy or your data, contact us at:</p>
              <p>
                <a href="mailto:labirnythgame@gmail.com">labirnythgame@gmail.com</a>
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
