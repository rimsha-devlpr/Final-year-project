import { TrendingUp, Printer, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

      {/* Total Pages Printed */}
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground">
            Total Pages Printed
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums flex items-baseline gap-1">
            <span className="text-sm">Rs</span>
            <span>0</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Printer className="h-3 w-3" />
              +0%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <Printer className="h-3 w-3" /> Students actively printing
          </div>
          <div>Tracked via secure token printing</div>
        </CardFooter>
      </Card>

      {/* New Students Registered */}
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs text-muted-foreground">
            New Students Registered
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums flex items-baseline gap-1">
            <span className="text-sm">Rs</span>
            <span>0</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +0%
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
          <CardDescription className="text-xs text-muted-foreground">
            Active Print Requests
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums flex items-baseline gap-1">
            <span className="text-sm">Rs</span>
            <span>0</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Printer className="h-3 w-3" />
              +0%
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

    </div>
  );
}
