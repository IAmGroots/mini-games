import { cn } from "@/lib/utils";

interface WordDisplayProps {
  text: string;
  userInput: string;
}

export default function WordDisplay({ text, userInput }: WordDisplayProps) {
  return (
    <div className="bg-secondary p-8 rounded-lg text-2xl font-mono leading-relaxed">
      {text.split("").map((char, index) => {
        let className = "text-muted-foreground";

        if (index < userInput.length) {
          if (userInput[index] === char) {
            className = "text-green-500";
          } else {
            className = "text-red-500 bg-red-500/20";
          }
        } else if (index === userInput.length) {
          className = "text-foreground bg-primary/20 animate-pulse";
        }

        return (
          <span key={index} className={cn(className)}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
