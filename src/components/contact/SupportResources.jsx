'use client'

import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { trackDatasheetDownload } from '../../utils/analytics'

export default function SupportResources() {
  const resources = [
    {
      icon: DocumentTextIcon,
      title: 'CC Heavy Duty Technical Sheet',
      href: '#technical',
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Matting Cleaning Procedure',
      href: '#technical',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Warranty Information',
      href: '#technical',
    },
    {
      icon: BookOpenIcon,
      title: 'Brochure Download',
      href: '#technical',
    },
  ]

  return (
    <section className="bg-neutral-light py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-neutral-dark mb-4">
            Technical Support & Documentation
          </h2>
          <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
            Access technical resources and documentation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.a
                key={resource.title}
                href={resource.href}
                onClick={() => trackDatasheetDownload(resource.title)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white rounded-xl p-6 border border-neutral-dark/5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-dark mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}



