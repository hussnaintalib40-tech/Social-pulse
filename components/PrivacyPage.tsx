import React from 'react';
import { Shield, Lock, Eye, Server, CreditCard } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-500">Last Updated: October 2023</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
        
        {/* Intro */}
        <section className="border-b border-gray-100 pb-8">
          <p className="text-slate-600 leading-relaxed">
            At <strong>SocialPulse Lite</strong>, we believe your data belongs to you. Our architecture is designed to minimize data collection. This policy explains how we handle information for both our Free (Client-Side) tools and our Pro (Cloud-Based) subscription.
          </p>
        </section>

        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-slate-900">1. Data Collection & Processing</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Free Users
              </h3>
              <p className="text-sm text-slate-600">
                <strong>Zero Server Storage.</strong> When you use our free calculators, all math happens locally in your browser (Client-Side). We do not transmit your input numbers or username to our servers. Your data disappears the moment you close the tab.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span> Pro Subscribers
              </h3>
              <p className="text-sm text-slate-600">
                <strong>Encrypted Storage.</strong> To provide historical tracking, PDF reports, and trend analysis, we must save your analysis results to our secure database. This data is encrypted and associated with your account ID.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-slate-900">2. Payment Information</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            We do <strong>not</strong> store your credit card details or bank information on our servers.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-slate-600">
            <li>All transactions are processed securely via <strong>Stripe</strong> or <strong>PayPal</strong>.</li>
            <li>We only retain a reference ID (token) to manage your subscription status (Active/Cancelled).</li>
            <li>Your billing address may be stored by our payment processors for tax compliance.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-slate-900">3. Cookies & Advertising</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            We use cookies to maintain your session and improve website performance.
          </p>
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
            <h3 className="font-bold text-yellow-900 mb-2">Google AdSense (Free Plan Only)</h3>
            <p className="text-yellow-800 text-sm mb-2">
              For free users, we display advertisements provided by Google AdSense. Google uses cookies (like the DoubleClick cookie) to serve relevant ads based on your browsing history.
            </p>
            <p className="text-yellow-800 text-sm">
              <strong>Pro Users:</strong> When you upgrade to Pro, we disable ad-serving cookies for a strictly private, tracking-free experience.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-slate-900">4. Third-Party Platforms</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            SocialPulse Lite is an independent tool. We are not affiliated with Instagram, TikTok, YouTube, or Facebook. We do not have access to your private social media passwords. We strictly analyze <strong>publicly available data</strong> that you input manually.
          </p>
        </section>

        {/* Contact */}
        <section className="pt-6 border-t border-gray-100">
          <p className="text-slate-500 text-sm">
            Questions about your data? Contact our Data Protection Officer at <a href="mailto:privacy@socialpulselite.com" className="text-primary-600 hover:underline">privacy@socialpulselite.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;