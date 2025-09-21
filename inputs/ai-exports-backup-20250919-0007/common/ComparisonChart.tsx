import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  data: Array<{
    name: string;
    value: number;
    label: string;
  }>;
  height?: number;
}

export function ComparisonChart({ data, height = 96 }: ComparisonChartProps) {
  return (
    <div className="h-24 mb-4" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="25%"
        >
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "var(--muted-foreground)",
              fontFamily: "Open Sans",
            }}
          />
          <YAxis hide />
          <Bar
            dataKey="value"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}