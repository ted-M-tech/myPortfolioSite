interface PageHeaderProps {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{title}</h1>
      <p className="text-xl text-muted-foreground">{subtitle}</p>
    </div>
  )
} 