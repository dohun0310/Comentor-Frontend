"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { Logo } from "@/components/Logo";
import {
  MenuIcon,
  CloseIcon,
  HomeIcon,
  ClockIcon,
  ChevronDownIcon,
} from "@/components/Icon";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <>
      <button
        type="button"
        aria-label="메뉴 열기"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 backdrop-blur transition-colors hover:bg-white"
      >
        <MenuIcon size={20} color="var(--color-gray-800)" />
      </button>

      {mobileOpen && (
        <div
          aria-hidden
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          "z-50 bg-white border-r border-gray-200 flex flex-col justify-between",
          // desktop
          "hidden md:flex md:sticky md:top-0 md:h-screen md:transition-[width] md:duration-200",
          collapsed ? "md:w-14" : "md:w-64",
          // mobile drawer
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:w-64 max-md:transition-transform max-md:duration-200",
          mobileOpen ? "max-md:flex max-md:translate-x-0" : "max-md:-translate-x-full",
        )}
      >
        <div className="flex flex-col gap-3 px-2.5 pt-0">
          <div className="flex h-15 items-center justify-between px-2">
            {!collapsed ? (
              <>
                <Logo size={16} color="var(--color-gray-700)" />
                <button
                  type="button"
                  aria-label="메뉴 접기"
                  onClick={() => {
                    if (mobileOpen) setMobileOpen(false);
                    else setCollapsed(true);
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded text-gray-800 hover:bg-gray-100"
                >
                  <CloseIcon size={20} color="currentColor" />
                </button>
              </>
            ) : (
              <button
                type="button"
                aria-label="메뉴 펼치기"
                onClick={() => setCollapsed(false)}
                className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100"
              >
                <MenuIcon size={20} color="var(--color-gray-800)" />
              </button>
            )}
          </div>

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex h-9.5 items-center gap-2 rounded-[10px] px-2 transition-colors hover:bg-gray-100",
              isHome && "bg-gray-100",
            )}
          >
            <HomeIcon size={20} color="var(--color-gray-800)" />
            {!collapsed && (
              <span className="text-sm font-medium text-gray-800">홈</span>
            )}
          </Link>

          <div className="h-px bg-gray-200" />

          <button
            type="button"
            onClick={() => setHistoryOpen((v) => !v)}
            className="flex h-9.5 items-center justify-between rounded-[10px] px-2 transition-colors hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <ClockIcon size={20} color="var(--color-gray-800)" />
              {!collapsed && (
                <span className="text-sm font-medium text-gray-800">
                  히스토리
                </span>
              )}
            </span>
            {!collapsed && (
              <span
                className={cn(
                  "transition-transform",
                  historyOpen && "rotate-180",
                )}
              >
                <ChevronDownIcon size={20} color="var(--color-gray-500)" />
              </span>
            )}
          </button>

          {!collapsed && historyOpen && (
            <div className="flex items-center justify-center px-2 py-4">
              <span className="text-xs text-gray-400">히스토리가 없습니다</span>
            </div>
          )}
        </div>

        <div className="flex h-15 items-center gap-3 px-4 pb-2">
          <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-blue-300 to-blue-500" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-800">Comentor</span>
              <span className="text-xs text-gray-600">Free Plan</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
