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
  FolderIcon
} from '@heroicons/react/24/outline'
import { trackFormOpen, trackPhoneClick } from '../../utils/analytics'

export default function Header({ onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openSubDropdown, setOpenSubDropdown] = useState(null)
  const pathname = usePathname()
  
  // Helper function to check if a route is active
  const isActiveRoute = (href) => {
    if (pathname === href) return true
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

  const dropdownMenus = {
    Products: [
      { name: 'CC Heavy Duty', href: '/products/heavy-duty', icon: CubeIcon },
      { name: 'CC Portable Cleanroom Mats', href: '/products/portable-cleanroom-mats', icon: Square2StackIcon },
      {
        name: 'Anti-Fatigue Mats',
        href: '#anti-fatigue-mats',
        icon: SparklesIcon,
        hasSubMenu: true,
        subItems: [
          { name: 'CC Matting Classic Ergonomic Mat', href: '/products/anti-fatigue-mats/classic-ergonomic-mat' },
          { name: 'CC Infinity Ergonomic Mat', href: '/products/anti-fatigue-mats/infinity-ergonomic-mat' },
          { name: 'CC Complete Ergonomic Mat', href: '/products/anti-fatigue-mats/complete-ergonomic-mat' },
        ]
      },
      { name: 'Entrance Matting Ireland', href: 'https://entrancemattingireland.ie/', icon: HomeIcon },
    ],
    Technical: [
      { name: 'View All Technical Documents', href: '/technical', icon: FolderIcon },
      { name: 'CC MATTING V PEEL OFF MATT COMPARISON', href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.2-Copy.pdf', icon: ArrowsRightLeftIcon },
      { name: 'CC HEAVY DUTY TECHNICAL DATA SHEET', href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.1-Copy.pdf', icon: DocumentTextIcon },
      { name: 'CC Matting cleaning procedure', href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.5-Copy.pdf', icon: BeakerIcon },
      { name: 'CC Matting Warranty', href: 'https://www.ccmatting.ie/wp-content/uploads/2018/08/5332201-CC-Matting-A4-5pp-website-info.3-Copy.pdf', icon: ShieldCheckIcon },
      { name: 'CC Matting Brochure', href: 'https://www.ccmatting.ie/wp-content/uploads/2024/10/CCMatting-2pager-2.pdf', icon: BookOpenIcon },
    ],
    Industries: [
      { name: 'NURSING HOMES', href: '/industries/nursing-homes', icon: HeartIcon },
      { name: 'SEMI CONDUCTOR', href: '/industries/semi-conductor', icon: CpuChipIcon },
      { name: 'HOSPITALS', href: '/industries/hospitals', icon: BuildingOffice2Icon },
      { name: 'PHARMACEUTICAL', href: '/industries/pharmaceutical-industry', icon: BeakerIcon },
      { name: 'LIFE SCIENCE', href: '/industries/life-science', icon: GlobeAmericasIcon },
      { name: 'Schools/Public Entrances', href: '/industries/schools-public-entrances', icon: AcademicCapIcon },
      { name: 'DATA CENTRES', href: '/industries/data-centres', icon: ServerIcon },
      { name: 'Medical Devices', href: '/industries/medical-devices', icon: WrenchScrewdriverIcon },
    ],
  }

  const navItems = [
    { name: 'Home', href: '/', isLink: true },
    { name: 'Features & Benefits', href: '/features-benefits', isLink: true },
    { name: 'Products', href: '#products', isLink: false, hasDropdown: true },
    { name: 'Technical', href: '/technical', isLink: false, hasDropdown: true },
    { name: 'Industries', href: 'industries', isLink: false, hasDropdown: true },
    { name: 'Blogs', href: '/blog', isLink: true },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-3 lg:py-0">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl lg:text-2xl font-display font-semibold text-primary">
                <Image 
                  src="/assets/CC MATTING_New_2_Horizontal version_page-0001.jpg" 
                  alt="CC Matting" 
                  width={200} 
                  height={52}
                  className="w-full h-13"
                  priority
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
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
                      className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActiveRoute(item.href)
                          ? 'text-primary font-semibold'
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
                              target={item.name==='Technical' && dropdownItem.href.startsWith('http') ? '_blank' : '_self'}
                              className={`flex items-center px-3 py-2.5 text-xs transition-colors rounded-sm mx-1 ${dropdownItem.hasSubMenu ? 'justify-between pr-2' : ''} ${
                                isActiveRoute(dropdownItem.href)
                                  ? 'bg-accent/10 text-primary font-semibold' 
                                  : 'text-neutral-dark hover:bg-accent/10 hover:text-primary'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {dropdownItem.icon && (
                                  <div className={`w-7 h-7 transition-colors duration-300 rounded-md flex justify-center items-center ${
                                    isActiveRoute(dropdownItem.href)
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
                                      target={item.name==='Technical' && subItem.href.startsWith('http') ? '_blank' : '_self'}
                                      className={`flex items-center px-4 py-2.5 text-xs transition-colors rounded-sm mx-1 ${
                                        isActiveRoute(subItem.href)
                                          ? 'bg-accent/10 text-primary font-semibold'
                                          : 'text-neutral-dark hover:bg-accent/10 hover:text-primary'
                                      }`}
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${
                                        isActiveRoute(subItem.href)
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
                    className={`text-sm h-18 flex items-center font-medium transition-colors px-3 py-2 rounded-lg relative ${
                      isActiveRoute(item.href)
                        ? 'text-white font-semibold'
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
                  className="text-sm h-18 flex items-center font-medium text-neutral-dark hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-cta text-white text-sm font-medium hover:scale-[1.03] transform transition shadow-sm"
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
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 mt-4 overflow-hidden border-t border-neutral-dark/10">
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.name} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className={`px-3 py-2 text-base font-medium rounded-md transition-colors flex-1 ${
                            isActiveRoute(item.href)
                              ? 'text-primary font-semibold'
                              : 'text-neutral-dark hover:text-primary hover:bg-neutral-light'
                          }`}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className="px-2 py-2 text-neutral-dark hover:text-primary transition-colors"
                        >
                          <ChevronDownIcon className={`w-5 h-5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {openDropdown === item.name && (
                        <div className=" pr-3 py-2 flex flex-col gap-0 bg-white/50 rounded-sm mx-2 my-1">
                          {dropdownMenus[item.name].map((dropdownItem, index) => (
                            <div key={dropdownItem.name} className="flex flex-col">
                              {dropdownItem.hasSubMenu ? (
                                <>
                                  <button
                                    onClick={() => setOpenSubDropdown(openSubDropdown === dropdownItem.name ? null : dropdownItem.name)}
                                    className="px-3 py-2.5 text-sm text-neutral-dark hover:text-primary hover:bg-accent/10 rounded-sm transition-colors flex items-center justify-between"
                                  >
                                    <div className='flex items-center gap-2.5'>
                                      {dropdownItem.icon && (
                                        <div className='w-7 h-7 bg-primary/5 rounded-md flex justify-center items-center text-primary'>
                                          <dropdownItem.icon className="w-4 h-4" />
                                        </div>
                                      )}
                                      <span className="font-medium">{dropdownItem.name}</span>
                                    </div>
                                    <ChevronRightIcon className={`w-4 h-4 transition-transform ${openSubDropdown === dropdownItem.name ? 'rotate-90' : ''}`} />
                                  </button>
                                  {openSubDropdown === dropdownItem.name && (
                                    <div className="pl-4 pr-2 py-1 flex flex-col gap-0 bg-white/30 rounded-sm mx-1 my-1">
                                      {dropdownItem.subItems.map((subItem, subIndex) => (
                                        <div key={subItem.name}>
                                          <a
                                            href={subItem.href}
                                            target={item.name==='Technical' && subItem.href.startsWith('http') ? '_blank' : '_self'}
                                            className={`flex items-center px-3 py-2 text-xs rounded-sm transition-colors group ${
                                              isActiveRoute(subItem.href)
                                                ? 'bg-accent/10 text-primary font-semibold'
                                                : 'text-neutral-dark hover:text-primary hover:bg-accent/10'
                                            }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${
                                              isActiveRoute(subItem.href)
                                                ? 'bg-primary'
                                                : 'bg-gray-300 group-hover:bg-primary'
                                            }`}></div>
                                            {subItem.name}
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                  <a
                                    href={dropdownItem.href}
                                    target={item.name==='Technical' && dropdownItem.href.startsWith('http') ? '_blank' : '_self'}
                                    className={`block px-3 py-2.5 text-sm rounded-sm transition-colors ${
                                      isActiveRoute(dropdownItem.href)
                                        ? 'bg-accent/10 text-primary font-semibold'
                                        : 'text-neutral-dark hover:text-primary hover:bg-accent/10'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                  <div className='flex items-center gap-2.5'>
                                    {dropdownItem.icon && (
                                      <div className={`w-7 h-7 rounded-md flex justify-center items-center transition-colors ${
                                        isActiveRoute(dropdownItem.href)
                                          ? 'bg-primary text-white'
                                          : 'bg-primary/5 text-primary'
                                      }`}>
                                        <dropdownItem.icon className="w-4 h-4" />
                                      </div>
                                    )}
                                    <span className="font-medium">{dropdownItem.name}</span>
                                  </div>
                                </a>
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
                      className={`px-3 py-2 text-base font-medium rounded-md transition-colors relative ${
                        isActiveRoute(item.href)
                          ? 'text-white font-semibold'
                          : 'text-neutral-dark'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {isActiveRoute(item.href) && (
                        <div className="absolute inset-0 bg-primary rounded-md -z-10"></div>
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-base font-medium text-neutral-dark hover:text-primary hover:bg-neutral-light rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}





