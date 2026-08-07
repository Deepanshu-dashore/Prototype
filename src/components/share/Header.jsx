'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CubeIcon,
  Square2StackIcon,
  SparklesIcon,
  HomeIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  BeakerIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  HeartIcon,
  CpuChipIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  AcademicCapIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
  FolderIcon,
  CheckBadgeIcon,
  BoltIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UsersIcon,
  Square3Stack3DIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { getAllIndustries } from '../../utils/industriesData'

// ... existing imports ...

// Inside component ...
import { trackFormOpen, trackPhoneClick } from '../../utils/analytics'

export default function Header({ onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openSubDropdown, setOpenSubDropdown] = useState(null)
  const pathname = usePathname()

  // Helper function to check if a route is active
  const isActiveRoute = (href) => {
    if (pathname === href) return true
    if (href === '/data-center' || href === '/data-centres') {
      return pathname === '/data-center' || pathname === '/data-centres'
    }
    // For industry routes, check if pathname matches the slug
    if (href.startsWith('/industries/')) {
      return pathname.startsWith(href) || pathname === href
    }
    // For product routes, check if pathname matches
    if (href.startsWith('/products/')) {
      return pathname.startsWith(href) || pathname === href
    }
    return false
  }

  const industriesData = getAllIndustries()

  const dropdownMenus = {
    Products: [
      { name: 'CCM Heavy Duty', href: '/products/heavy-duty', icon: Square3Stack3DIcon },
      { name: 'CCM Data Centers', href: '/data-center', icon: ServerIcon },
      { name: 'CCM Portable Cleanroom Mats', href: '/products/portable-cleanroom-mats', icon: BriefcaseIcon },
      {
        name: 'CCM Anti-Fatigue Mats',
        href: '#anti-fatigue-mats',
        icon: UsersIcon,
        hasSubMenu: true,
        subItems: [
          { name: 'CCM Classic Ergonomic Mat', href: '/products/anti-fatigue-mats/classic-ergonomic-mat' },
          { name: 'CCM Infinity Ergonomic Mat', href: '/products/anti-fatigue-mats/infinity-ergonomic-mat' },
          { name: 'CCM Complete Ergonomic Mat', href: '/products/anti-fatigue-mats/complete-ergonomic-mat' },
        ]
      },
      {
        name: 'CleanTech® Automated Systems',
        href: '#cleantech-systems',
        icon: SparklesIcon,
        hasSubMenu: true,
        subItems: [
          { name: 'CleanTech® EVO Wall', href: '/products/cleantech-evo-wall' },
          { name: 'CleanTech® EVO One', href: '/products/cleantech-evo-one' },
          { name: 'CleanTech® EVO In-Counter', href: '/products/cleantech-evo-in-counter' },
          { name: 'CleanTech® EVO Three', href: '/products/cleantech-evo-three' },
        ]
      },
      {
        name: 'CleanTech® Solutions',
        href: '#cleantech-solutions',
        icon: BeakerIcon,
        hasSubMenu: true,
        subItems: [
          { name: 'CleanTech® UPX Solution', href: '/products/cleantech-upx' },
          { name: 'SelfCleanX Solution', href: '/products/selfcleanx' },
        ]
      },
      { name: 'Entrance Matting Ireland', href: 'https://entrancemattingireland.ie/', icon: BuildingOfficeIcon },
      { name: 'Logo Mats Ireland', href: 'https://logomatsireland.ie/', icon: BuildingOfficeIcon },
    ],
    // Technical: [
    //   { name: 'View All Technical Documents', href: '/compliance', icon: FolderIcon },
    //   { name: 'CC Matting vs Peel-Off Mat Comparison', href: 'https://ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.2-Copy.pdf', icon: ArrowsRightLeftIcon },
    //   { name: 'CC Heavy Duty Technical Data Sheet', href: 'https://ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.1-Copy.pdf', icon: DocumentTextIcon },
    //   { name: 'CC Matting Cleaning Procedure', href: 'https://ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.5-Copy.pdf', icon: BeakerIcon },
    //   { name: 'CC Matting Warranty', href: 'https://ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.3-Copy.pdf', icon: ShieldCheckIcon },
    //   { name: 'CC Matting Brochure', href: 'https://ccmatting.ie/wp-content/uploads/2024/10/CCMatting-2pager-2.pdf', icon: BookOpenIcon },
    // ],
    Compliance: [
      { name: 'Quality & Compliance Overview', href: '/compliance', icon: InformationCircleIcon },
      { name: 'ISO 9001 - Cert 2025-26', href: '/compliances/doc/CC Matting - ISO 9001-2015 - 2025 - 2026.pdf', icon: CheckBadgeIcon },
      { name: 'ISO 45001 - Cert SEP 25', href: '/compliances/doc/ISO 45001-2018 SEP 25.pdf', icon: ShieldCheckIcon },
      { name: 'Anti-Microbial Efficacy - A', href: '/compliance3', icon: BeakerIcon },
      { name: 'Anti-Microbial Efficacy - B', href: '/compliance4', icon: BeakerIcon },
      { name: 'BPR/EPA', href: '/compliance5', icon: GlobeAmericasIcon },
      { name: 'Static Dissipative Testing 2026', href: '/compliances/doc/CCM STATIC DISSIPATIVE TEST RESULTS 2026.pdf', icon: BoltIcon },
      { name: 'CCMatting Efficacy Data', href: '/compliance7', icon: ChartBarIcon },
      { name: 'CCM NPI Brochure 2026', href: '/compliances/doc/CCM NPI BROCH IE 2026.pdf', icon: DocumentTextIcon },
    ],
    Industries: industriesData.map(ind => ({
      name: ind.title.replace('Contamination Control Mats for ', '').replace(' Industry', ''), // Simplified naming logic
      href: `/industries/${ind.slug}`,
      icon: ind.icon
    })),
  }

  const navItems = [
    { name: 'Home', href: '/', isLink: true },
    { name: 'Features & Benefits', href: '/features-benefits', isLink: true },
    { name: 'Products', href: '#products', isLink: false, hasDropdown: true },
    // { name: 'Technical', href: '/compliance', isLink: false, hasDropdown: true },
    { name: 'Compliance', href: '/compliance', isLink: false, hasDropdown: true },
    { name: 'Industries', href: '/industries', isLink: false, hasDropdown: true },
    // { name: 'Blogs', href: '/blog', isLink: true },
    { name: 'Contact', href: '/contact', isLink: true },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-3 lg:py-0">
      <nav className="max-w-[90dvw] mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl lg:text-2xl font-display font-semibold text-primary">
                <Image
                  src="/CCMate-Logo.jpg"
                  alt="CC Matting"
                  width={200}
                  height={52}
                  className="xl:h-13 xl:w-50 h-10 w-40 object-contain"
                  priority
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-8">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative h-18 flex items-center"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => {
                      setOpenDropdown(null)
                      setOpenSubDropdown(null)
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`xl:text-[13.5px] text-[11px] font-medium transition-colors flex items-center gap-1 ${isActiveRoute(item.href)
                        ? 'text-primary font-bold'
                        : 'text-neutral-dark hover:text-primary'
                        }`}
                    >
                      {item.name}
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </Link>
                    {openDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 w-72 bg-white rounded-sm shadow-lg border border-neutral-dark/10 py-1 z-50"
                        onMouseLeave={() => setOpenSubDropdown(null)}
                      >
                        {dropdownMenus[item.name].map((dropdownItem, index) => (
                          <div
                            key={dropdownItem.name}
                            className="relative group"
                            onMouseEnter={() => dropdownItem.hasSubMenu && setOpenSubDropdown(dropdownItem.name)}
                            onMouseLeave={() => setOpenSubDropdown(null)}
                          >
                            <a
                              href={dropdownItem.href}
                              target={(dropdownItem.href.startsWith('http') || dropdownItem.href.endsWith('.pdf')) ? '_blank' : '_self'}
                              className={`flex items-center px-3 py-2.5 text-xs transition-colors rounded-sm mx-1 ${dropdownItem.hasSubMenu ? 'justify-between pr-2' : ''} ${isActiveRoute(dropdownItem.href)
                                ? 'bg-accent/10 text-primary font-semibold'
                                : 'text-neutral-dark hover:bg-accent/10 hover:text-primary'
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                {dropdownItem.icon && (
                                  <div className={`w-7 h-7 transition-colors duration-300 rounded-md flex justify-center items-center ${isActiveRoute(dropdownItem.href)
                                    ? 'bg-primary text-white'
                                    : 'bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white'
                                    }`}>
                                    <dropdownItem.icon className="w-4 h-4" />
                                  </div>
                                )}
                                <span className="font-medium">{dropdownItem.name}</span>
                              </div>
                              {dropdownItem.hasSubMenu && (
                                <ChevronRightIcon className="w-3 h-3" />
                              )}
                            </a>

                            {dropdownItem.hasSubMenu && openSubDropdown === dropdownItem.name && (
                              <div className="absolute top-0 left-full mr-2 w-64 bg-white rounded-sm shadow-lg border border-neutral-dark/10 py-1 z-50">
                                {dropdownItem.subItems.map((subItem, subIndex) => (
                                  <div key={subItem.name}>
                                    <a
                                      href={subItem.href}
                                      target={item.name === 'Technical' && subItem.href.startsWith('http') ? '_blank' : '_self'}
                                      className={`flex items-center px-4 py-2.5 text-xs transition-colors rounded-sm mx-1 ${isActiveRoute(subItem.href)
                                        ? 'bg-accent/10 text-primary font-semibold'
                                        : 'text-neutral-dark hover:bg-accent/10 hover:text-primary'
                                        }`}
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${isActiveRoute(subItem.href)
                                        ? 'bg-primary'
                                        : 'bg-gray-300 group-hover:bg-primary'
                                        }`}></div>
                                      {subItem.name}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return item.isLink ? (
                <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className={`xl:text-[13.5px] text-[11px] h-18 flex items-center font-medium transition-colors px-3 py-2 rounded-lg relative ${isActiveRoute(item.href)
                      ? 'text-white font-bold'
                      : 'text-neutral-dark'
                      }`}
                  >
                    {isActiveRoute(item.href) && (
                      <div className="absolute inset-0 bg-primary rounded-md -z-10 h-8 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="xl:text-[13.5px] text-[11px] h-18 flex items-center font-medium text-neutral-dark hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="/distributor"
              className="px-5 py-2.5 rounded-lg bg-cta text-white xl:text-sm text-xs font-medium hover:scale-[1.03] transform transition shadow-sm"
            >
              Distributor
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden cursor-pointer p-2 text-neutral-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {/* Mobile menu (Drawer Overlay) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-neutral-dark/10 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-dark/5">
                <Image
                  src="/CCMate-Logo.jpg"
                  alt="Logo"
                  width={140}
                  height={38}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-neutral-dark/40 hover:text-primary transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <nav className="flex flex-col">
                  {navItems.map((item) => {
                    if (item.hasDropdown) {
                      return (
                        <div key={item.name} className="flex flex-col border-b border-neutral-dark/5 py-1">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                            className="flex items-center justify-between py-3 text-base font-medium text-neutral-dark hover:text-primary transition-all group"
                          >
                            <span className={isActiveRoute(item.href) ? 'text-primary' : ''}>{item.name}</span>
                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180 text-primary' : 'text-neutral-dark/30'}`} />
                          </button>

                          {openDropdown === item.name && (
                            <div className="flex flex-col gap-1 pl-4 mb-4 animate-in slide-in-from-top-2 duration-300">
                              {dropdownMenus[item.name].map((dropdownItem) => (
                                <div key={dropdownItem.name} className="flex flex-col">
                                  {dropdownItem.hasSubMenu ? (
                                    <>
                                      <button
                                        onClick={() => setOpenSubDropdown(openSubDropdown === dropdownItem.name ? null : dropdownItem.name)}
                                        className="flex items-center justify-between py-2 text-sm text-neutral-dark/70 hover:text-primary transition-colors pr-2"
                                      >
                                        <div className="flex items-center gap-3">
                                          {dropdownItem.icon && <dropdownItem.icon className="w-4 h-4 opacity-40" />}
                                          <span>{dropdownItem.name}</span>
                                        </div>
                                        <ChevronRightIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${openSubDropdown === dropdownItem.name ? 'rotate-90 text-primary' : 'text-neutral-dark/30'}`} />
                                      </button>

                                      {openSubDropdown === dropdownItem.name && (
                                        <div className="flex flex-col gap-1 pl-7 mb-2 border-l border-neutral-dark/10 animate-in slide-in-from-left-2 duration-300">
                                          {dropdownItem.subItems.map((subItem) => (
                                            <a
                                              key={subItem.name}
                                              href={subItem.href}
                                              onClick={() => setMobileMenuOpen(false)}
                                              className={`py-2 text-[13px] flex items-center gap-2 transition-colors ${isActiveRoute(subItem.href) ? 'text-primary font-semibold' : 'text-neutral-dark/60 hover:text-primary'}`}
                                            >
                                              <div className={`w-1 h-1 rounded-full ${isActiveRoute(subItem.href) ? 'bg-primary' : 'bg-neutral-dark/20'}`} />
                                              {subItem.name}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <a
                                      href={dropdownItem.href}
                                      target={(dropdownItem.href.startsWith('http') || dropdownItem.href.endsWith('.pdf')) ? '_blank' : '_self'}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`py-2 text-sm flex items-center gap-3 transition-colors ${isActiveRoute(dropdownItem.href) ? 'text-primary font-semibold' : 'text-neutral-dark/70 hover:text-primary'}`}
                                    >
                                      {dropdownItem.icon && <dropdownItem.icon className="w-4 h-4 opacity-40" />}
                                      {dropdownItem.name}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`py-3 text-base font-medium border-b border-neutral-dark/5 transition-colors ${isActiveRoute(item.href) ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
                      >
                        {item.name}
                      </Link>
                    )
                  })}

                  {/* Distributor Tab Type Link */}
                  <Link
                    href="/distributor"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 text-base font-medium border-b border-neutral-dark/5 transition-colors ${isActiveRoute('/distributor') ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
                  >
                    Distributor
                  </Link>
                </nav>
              </div>


            </div>
          </div>
        )}
      </nav>
    </header>
  )
}





