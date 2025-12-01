import { TrendingUp, TrendingDown, Printer, Brain, Users, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      
      {/* Total Notes Generated */}
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground">Total Notes Generated</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums">2,340</CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <TrendingUp className="h-3 w-3" /> AI note generation improving
          </div>
          <div>Generated via GPT + OCR</div>
        </CardFooter>
      </Card>

      {/* New Students Registered */}
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground">New Students Registered</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums">1,120</CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <Users className="h-3 w-3" /> Enrollment steadily growing
          </div>
          <div>Across all faculties</div>
        </CardFooter>
      </Card>

      {/* Active Print Requests */}
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground">Active Print Requests</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums">85</CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Printer className="h-3 w-3" />
              +10%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <Printer className="h-3 w-3" /> Stable print queue
          </div>
          <div>Token-based secure printing</div>
        </CardFooter>
      </Card>

      {/* AI Model Efficiency */}
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground">AI Model Efficiency</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums">4.5s</CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Brain className="h-3 w-3" />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <TrendingUp className="h-3 w-3" /> Consistent response time
          </div>
          <div>AI note generation speed</div>
        </CardFooter>
      </Card>
    </div>
  );
}
