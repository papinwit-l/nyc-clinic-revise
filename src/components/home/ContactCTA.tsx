import { LineIcon } from "@/components/shared/SocialIcons";

const LINE_URL = "https://lin.ee/7oJgymx";
const PHONE = "088-008-7870";
const PHONE_HREF = "tel:+66880087870";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.5491665484915!2d100.5808210881561!3d13.732112096670813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fab553b23b9%3A0xd3c1330b42d3d1a!2zTllDIFdlbGxuZXNzIENlbnRlciDguJfguK3guIfguKvguKXguYjguK0!5e0!3m2!1sen!2sus!4v1786096163043!5m2!1sen!2sus";

export default function ContactCTA() {
  return (
    <section className="bg-[var(--color-surface)] py-[var(--section-py)]">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Contact Us</span>
          <h2 className="section-heading text-3xl sm:text-4xl mt-3">
            ติดต่อเรา
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Info */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                Location
              </h3>
              <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-sm leading-relaxed">
                NYC Clinic (New York Clinic, GR)
                <br />
                กรุงเทพมหานคร
              </p>
            </div>

            {/* Phone */}
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                Phone
              </h3>
              <a
                href={PHONE_HREF}
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium transition-colors"
              >
                {PHONE}
              </a>
            </div>

            {/* Hours */}
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                Hours
              </h3>
              <p className="font-[var(--font-thai-body)] text-[var(--color-text-muted)] text-sm leading-relaxed">
                จันทร์ – เสาร์ 10:00 – 19:00 น.
                <br />
                อาทิตย์ 10:00 – 17:00 น.
              </p>
            </div>

            {/* LINE */}
            <div>
              <h3 className="font-[var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-text)] mb-2">
                LINE Official
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-4">
                @nyc-clinic
              </p>
            </div>

            {/* LINE CTA */}
            <div className="bg-[var(--color-primary)] p-6 sm:p-8 text-center">
              <p className="font-[var(--font-thai-head)] text-lg text-white font-medium">
                พร้อมเปลี่ยนแปลงตัวเอง?
              </p>
              <p className="font-[var(--font-accent)] text-[var(--color-accent-pale)] italic text-sm mt-1">
                Ready to Transform?
              </p>
              <p className="font-[var(--font-thai-body)] text-[var(--color-on-primary-muted)] text-sm mt-3">
                แอดไลน์เพื่อปรึกษาฟรี ไม่มีค่าใช้จ่าย
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line mt-5 inline-flex"
              >
                <LineIcon className="w-5 h-5" />
                แอดไลน์ปรึกษาฟรี
              </a>
            </div>
          </div>

          {/* Right — Map */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-[var(--color-surface-dim)]">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NYC Clinic Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
