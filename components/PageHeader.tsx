interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-brand-brown">{title}</h1>
      <p className="text-brand-brown/80">{description}</p>
    </div>
  )
}
