"use client"

import * as React from "react"
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Particles } from "./particles"

export const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-primary/10 mt-16">
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={40}
        staticity={30}
        color="#FF69B4"
        size={1}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Visit Us</h3>
            <p className="text-secondary-light">6 Tremont St</p>
            <p className="text-secondary-light">Brighton, MA</p>
            <a 
              href="tel:+1234567890" 
              className="text-secondary-light hover:text-primary transition-colors"
            >
              (123) 456-7890
            </a>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Hours</h3>
            <p className="text-secondary-light">Monday - Thursday: 11am - 10pm</p>
            <p className="text-secondary-light">Friday - Saturday: 11am - 12am</p>
            <p className="text-secondary-light">Sunday: 11am - 9pm</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full border-primary/20 bg-background hover:bg-primary/10 hover:text-primary"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full border-primary/20 bg-background hover:bg-primary/10 hover:text-primary"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full border-primary/20 bg-background hover:bg-primary/10 hover:text-primary"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 text-center md:flex-row">
          <p className="text-sm text-secondary-light">
            2024 Sweet & Comfy Boston. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-secondary-light">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
