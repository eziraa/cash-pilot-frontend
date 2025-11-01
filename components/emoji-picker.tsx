"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

// dynamically import the picker to avoid SSR errors
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export function EmojiSelector({ value, onChange }: { value?: string; onChange: (emoji: string) => void }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                    {value ? <span className="text-xl">{value}</span> : <Smile className="w-4 h-4" />}
                    <span className="text-sm text-muted-foreground">Select Emoji</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[320px] h-[400px] overflow-hidden">
                <EmojiPicker
                    onEmojiClick={(emojiData) => {
                        onChange(emojiData.emoji);
                        setOpen(false);
                    }}
                    width="100%"
                    height="100%"
                    lazyLoadEmojis
                    theme={theme.theme === "dark" ? "dark" : "light"}
                />
            </PopoverContent>
        </Popover>
    );
}
