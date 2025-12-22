'use client'

import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { trackDatasheetDownload } from '../../utils/analytics'

export default function SupportMaintenance() {
  const resources = [
    {
      icon: WrenchScrewdriverIcon,
      title: 'Cleaning Procedure',
      description: 'Step-by-step maintenance guide',
      href: '#technical',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Warranty',
      description: 'Product warranty information',
      href: '#technical',
    },
    {
      icon: DocumentTextIcon,
      title: 'Technical Datasheets',
      description: 'Download product specifications',
      href: '#technical',
    },
    {
      icon: BookOpenIcon,
      title: 'Product Brochure',
      description: 'Complete product overview',
      href: '#technical',
    },
    {
      icon: DocumentArrowDownIcon,
      title: 'Installation Guide',
      description: 'Installation instructions',
      href: '#technical',
    },
    {
      icon: PhoneIcon,
      title: 'Customer Support',
      description: 'Get help from our team',
      href: '#contact',
    },
  ]

  return (
    <section id="support" className="bg-white py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-[1.75rem] font-semibold text-neutral-dark mb-4">
            Support & Maintenance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.a
                key={resource.title}
                href={resource.href}
                onClick={() => {
                  if (resource.title !== 'Customer Support') {
                    trackDatasheetDownload(resource.title)
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white rounded-xl p-8 border-2 border-neutral-dark/10 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-dark mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-neutral-dark/70">
                  {resource.description}
                </p>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}



