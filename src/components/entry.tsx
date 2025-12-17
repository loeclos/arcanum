"use client";

import { useState } from "react";
import { 
  Link, 
  Check, 
  Calendar, 
  Tag, 
  MoreVertical, 
  Clock, 
  Hash, 
  Database,
  Copy 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Types ---
export interface Line {
  speaker: string;
  text: string;
}

export interface EntryData {
  id: number;
  event: number;
  event_name: string;
  event_date: string;
  event_state: string;
  date: string;
  paraphrased: boolean;
  modified_date: string;
  tags: string[];
  lines: Line[];
  note: string;
}

interface EntryCardProps {
  entry: EntryData;
  className?: string;
}

export default function EntryCard({ entry, className }: EntryCardProps) {
  const [isMainLinkCopied, setIsMainLinkCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // --- Helpers ---

  const handleCopyMainLink = async () => {
    try {
      const url = `${window.location.origin}/entries/${entry.id}`;
      await navigator.clipboard.writeText(url);
      setIsMainLinkCopied(true);
      setTimeout(() => setIsMainLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleCopyData = async (e: Event, text: string | number, fieldKey: string) => {
    // Prevent dropdown from closing immediately so user sees feedback
    e.preventDefault(); 
    
    try {
      await navigator.clipboard.writeText(String(text));
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 1500);
    } catch (err) {
      console.error("Failed to copy data:", err);
    }
  };

  const formatDateSimple = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className={cn("w-full max-w-3xl shadow-sm flex flex-col", className)}>
      {/* Layout Change: 
        - 'flex-col' by default for mobile (stacks vertically)
        - 'sm:flex-row' for tablets/desktop (side-by-side)
      */}
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between space-y-0 pb-4">
        
        {/* Title Section */}
        <div className="space-y-1 w-full">
          <CardTitle className="text-xl dark:font-thin font-mono text-primary break-words">
            {entry.event_name}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5" />
            {formatDateSimple(entry.event_date)}
            {entry.paraphrased && (
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                Paraphrased
              </Badge>
            )}
          </CardDescription>
        </div>

        {/* Action Buttons: Stacked under title on mobile, Right aligned on desktop */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none h-8 gap-2"
            onClick={handleCopyMainLink}
          >
            {isMainLinkCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Link className="h-3.5 w-3.5" />
                <span>Link</span>
              </>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 border sm:border-transparent">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Entry Metadata</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-1 space-y-1">
                {/* Each Item is a DropdownMenuItem. 
                   onSelect is intercepted to copy text and prevent closing.
                */}

                {/* Entry ID */}
                <DropdownMenuItem 
                  className="flex justify-between items-center cursor-pointer group"
                  onSelect={(e) => handleCopyData(e, entry.id, 'id')}
                >
                  <span className="text-muted-foreground flex gap-2 items-center text-xs">
                    <Hash className="h-3 w-3" /> Entry ID
                  </span>
                  {copiedField === 'id' ? (
                    <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    <span className="font-mono text-xs group-hover:underline decoration-muted-foreground/50 underline-offset-2">
                      {entry.id}
                    </span>
                  )}
                </DropdownMenuItem>

                {/* Event ID */}
                <DropdownMenuItem 
                  className="flex justify-between items-center cursor-pointer group"
                  onSelect={(e) => handleCopyData(e, entry.event, 'event')}
                >
                  <span className="text-muted-foreground flex gap-2 items-center text-xs">
                    <Database className="h-3 w-3" /> Event ID
                  </span>
                  {copiedField === 'event' ? (
                    <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    <span className="font-mono text-xs group-hover:underline decoration-muted-foreground/50 underline-offset-2">
                      {entry.event}
                    </span>
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* State */}
                <DropdownMenuItem 
                  className="flex justify-between items-center cursor-pointer group"
                  onSelect={(e) => handleCopyData(e, entry.event_state, 'state')}
                >
                  <span className="text-muted-foreground text-xs pl-5">State</span>
                  {copiedField === 'state' ? (
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                     <Check className="h-3 w-3" /> Copied
                   </span>
                  ) : (
                    <span className="text-xs group-hover:underline decoration-muted-foreground/50 underline-offset-2">
                      {entry.event_state}
                    </span>
                  )}
                </DropdownMenuItem>
                
                 {/* Recorded Date */}
                <DropdownMenuItem 
                  className="flex justify-between items-center cursor-pointer group"
                  onSelect={(e) => handleCopyData(e, entry.date, 'date')}
                >
                  <span className="text-muted-foreground flex gap-2 items-center text-xs">
                    <Calendar className="h-3 w-3" /> Recorded
                  </span>
                  {copiedField === 'date' ? (
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                     <Check className="h-3 w-3" /> Copied
                   </span>
                  ) : (
                    <span className="text-xs group-hover:underline decoration-muted-foreground/50 underline-offset-2">
                      {formatDateSimple(entry.date)}
                    </span>
                  )}
                </DropdownMenuItem>

                {/* Modified Date */}
                <DropdownMenuItem 
                  className="flex justify-between items-center cursor-pointer group"
                  onSelect={(e) => handleCopyData(e, entry.modified_date, 'modified')}
                >
                  <span className="text-muted-foreground flex gap-2 items-center text-xs">
                    <Clock className="h-3 w-3" /> Modified
                  </span>
                  {copiedField === 'modified' ? (
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                     <Check className="h-3 w-3" /> Copied
                   </span>
                  ) : (
                    <span className="text-xs group-hover:underline decoration-muted-foreground/50 underline-offset-2">
                      {formatDateTime(entry.modified_date).split(',')[0]}...
                    </span>
                  )}
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 flex-grow">
        {/* Render Lines */}
        {entry.lines.map((line, index) => (
          <div key={index} className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {line.speaker}
            </span>
            <div
              className="text-base leading-relaxed text-foreground/90 [&>p]:mb-3 [&>p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: line.text }}
            />
          </div>
        ))}

        {entry.note && (
          <div className="bg-muted/40 p-3 rounded-md text-sm italic border-l-4 border-muted-foreground/50 text-muted-foreground">
            <strong>Note:</strong> {entry.note}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t bg-slate-50/50 dark:bg-slate-900/20 mt-auto">
        <div className="w-full flex items-center gap-3">
            <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex flex-wrap gap-2">
            {entry.tags && entry.tags.length > 0 ? (
                entry.tags.map((tag) => (
                <Badge 
                    key={tag} 
                    variant="outline" 
                    className="bg-background hover:bg-accent"
                >
                    {tag}
                </Badge>
                ))
            ) : (
                <span className="text-sm text-muted-foreground italic">
                    No tags
                </span>
            )}
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}