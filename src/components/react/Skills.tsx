import { useEffect } from 'react'
import { InfiniteScroll } from './InfiniteScroll'
import { getIcon } from './SkillsIconLoader'

// Types for technologies
type Category = {
  text: string
  logo: string
  featured?: boolean 
}

type Technologies = {
  'Systems & Virtualization': Category[]
  'Networking & Security': Category[]
  'Automation & Orchestration': Category[]
  'Cloud & Infrastructure': Category[]
  'Monitoring & Tools': Category[]
  'Programming Language': Category[]
}

// Technologies based on CV
const technologies: Technologies = {
  'Systems & Virtualization': [
    { text: 'Linux', logo: 'simple-icons:linux', featured: true },
    { text: 'Ubuntu', logo: 'mdi:ubuntu' },
    { text: 'Debian', logo: 'simple-icons:debian' },
    { text: 'Windows Server', logo: 'mdi:windows' },
    { text: 'Proxmox', logo: 'simple-icons:proxmox' },
    { text: 'Docker', logo: 'mdi:docker' },
    { text: 'Kubernetes', logo: 'mdi:kubernetes' },
    { text: 'XEN', logo: 'lucide:box' },
  ],
  'Networking & Security': [
    { text: 'CISCO', logo: 'simple-icons:cisco' },
    { text: 'pfSense', logo: 'simple-icons:pfsense' },
    { text: 'Fortinet', logo: 'simple-icons:fortinet' },
    { text: 'Palo Alto', logo: 'simple-icons:paloaltonetworks' },
    { text: 'StrongSwan', logo: 'lucide:wifi' },
    { text: 'VLAN', logo: 'lucide:network' },
    { text: 'CyberArk', logo: 'lucide:lock' },
    { text: 'Nessus', logo: 'lucide:shield' },
  ],
  'Automation & Orchestration': [
    { text: 'Ansible', logo: 'simple-icons:ansible' },
    { text: 'Terraform', logo: 'simple-icons:terraform' },
    { text: 'Puppet', logo: 'simple-icons:puppet' },
    { text: 'SALT', logo: 'simple-icons:saltproject' },
    { text: 'Bash', logo: 'lucide:terminal', featured: true },
    { text: 'Git', logo: 'mdi:git', featured: true },
    { text: 'Flux', logo: 'simple-icons:flux' },
    { text: 'Rancher', logo: 'simple-icons:rancher' },
  ],
  'Cloud & Infrastructure': [
    { text: 'AWS', logo: 'lucide:cloud' },
    { text: 'Oracle Cloud', logo: 'simple-icons:oracle' },
    { text: 'Cloudflare', logo: 'simple-icons:cloudflare' },
    { text: 'InfiniBand', logo: 'lucide:network' },
    { text: 'PBS Scheduler', logo: 'lucide:server' },
    { text: 'ManageIQ', logo: 'lucide:cloud-cog' },
    { text: 'Talos Linux', logo: 'lucide:box' },
    { text: 'Cilium CNI', logo: 'simple-icons:cilium' },
  ],
  'Monitoring & Tools': [
    { text: 'Portainer', logo: 'simple-icons:portainer' },
    { text: 'BAREOS', logo: 'lucide:hard-drive' },
    { text: 'Asterisk', logo: 'simple-icons:asterisk' },
    { text: 'Apache', logo: 'simple-icons:apache' },
    { text: 'Nginx', logo: 'simple-icons:nginx' },
    { text: 'MySQL', logo: 'simple-icons:mysql', featured: true },
    { text: 'WordPress', logo: 'simple-icons:wordpress' },
    { text: 'cPanel', logo: 'simple-icons:cpanel' },
    { text: 'Unity', logo: 'simple-icons:unity', featured: true },
  ],
  'Programming Language': [
    { text: 'Python', logo: 'simple-icons:python', featured: true },
    { text: 'Cpp', logo: 'simple-icons:cpp', featured: true },
    { text: 'JavaScript', logo: 'simple-icons:js', featured: true },
  ]
}

const categories = Object.keys(technologies)
const groupSize = Math.ceil(categories.length / 3)
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2),
]

const Skills: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible')
    })
  }, [])

  // 1. FLATTEN: Get all technologies from all categories into one single array
  // If you added 'featured: true' from the previous step, add .filter(t => t.featured) here
  const allSkills = Object.values(technologies)
    .flat()
    .filter((tech) => tech.featured === true);

  // 2. DISTRIBUTE: Create 3 balanced rows
  const rows: Category[][] = [[], [], []]

  allSkills.forEach((tech, index) => {
    // This distributes items: 1st->Row1, 2nd->Row2, 3rd->Row3, 4th->Row1, etc.
    const rowIndex = index % 3
    rows[rowIndex].push(tech)
  })

  return (
    <div className="z-30 mt-12 flex w-full flex-col max-w-[calc(100vw-5rem)] mx-auto lg:max-w-full">
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <InfiniteScroll
            key={rowIndex}
            duration={50000}
            direction={rowIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center"
          >
            {/* 3. RENDER: Map directly over the specific row items */}
            {row.map((tech) => {
              const IconComponent = getIcon(tech.logo)
              return (
                <div
                  // Use tech.text as key since it's unique enough
                  key={tech.text} 
                  className="tech-badge repo-card border-border bg-card text-muted-foreground mr-5 flex items-center gap-3 rounded-full border p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                >
                  <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full p-2 text-lg shadow-inner">
                    <IconComponent className="tech-icon text-primary" />
                  </span>
                  <span className="text-foreground font-medium">
                    {tech.text}
                  </span>
                </div>
              )
            })}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  )
}

export default Skills
