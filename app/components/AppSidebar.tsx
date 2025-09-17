"use client"

import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Plus, Search, Trophy, Newspaper, Layers, BarChartHorizontal, Settings, HelpCircle, User2 } from "lucide-react"

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon" className="bg-black text-white border-r border-white/10">
        <SidebarHeader className="px-3 py-3">
          <div className="flex items-center gap-2 text-white/90 font-semibold">
            <span className="text-lg">LLMetric</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs tracking-wide text-zinc-400">Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="New Chat">
                    <Link href="#">
                      <span suppressHydrationWarning className="inline-flex"><Plus className="text-zinc-300" /></span>
                      <span>New Chat</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Search">
                    <Link href="#">
                      <span suppressHydrationWarning className="inline-flex"><Search className="text-zinc-300" /></span>
                      <span>Search</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Leaderboard">
                    <Link href="/">
                      <span suppressHydrationWarning className="inline-flex"><Trophy className="text-zinc-300" /></span>
                      <span>Leaderboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs tracking-wide text-zinc-400">Explore</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Compare">
                    <Link href="/compare">
                      <span suppressHydrationWarning className="inline-flex"><Layers className="text-zinc-300" /></span>
                      <span>Compare</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Benchmarks">
                    <Link href="#benchmarks">
                      <span suppressHydrationWarning className="inline-flex"><BarChartHorizontal className="text-zinc-300" /></span>
                      <span>Benchmarks</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="News">
                    <Link href="#news">
                      <span suppressHydrationWarning className="inline-flex"><Newspaper className="text-zinc-300" /></span>
                      <span>News</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Help">
                    <Link href="#">
                      <span suppressHydrationWarning className="inline-flex"><HelpCircle className="text-zinc-300" /></span>
                      <span>Help</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="#">
                      <span suppressHydrationWarning className="inline-flex"><Settings className="text-zinc-300" /></span>
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="#">
                      <span suppressHydrationWarning className="inline-flex"><User2 className="text-zinc-300" /></span>
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}


