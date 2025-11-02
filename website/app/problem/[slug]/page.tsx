import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Film } from "lucide-react"
import { getAllProblems, getProblemBySlug, getArticleContent } from "@/lib/problems"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedGif } from "@/components/optimized-gif"
import { ThemeToggle } from "@/components/theme-toggle"

export async function generateStaticParams() {
  const problems = getAllProblems()
  return problems.map((problem) => ({
    slug: problem.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const problem = getProblemBySlug(slug)
  
  if (!problem) {
    return {
      title: "Problem Not Found",
    }
  }

  return {
    title: `#${problem.number} ${problem.title} - LeetCode Animation`,
    description: `Visualize and learn ${problem.title} with animations and detailed explanations`,
  }
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const problem = getProblemBySlug(slug)

  if (!problem) {
    notFound()
  }

  const articleContent = getArticleContent(problem.articlePath)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">
                #{problem.number} {problem.title}
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Problem Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    #{problem.number} {problem.title}
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {problem.category && (
                      <Badge variant="secondary">{problem.category}</Badge>
                    )}
                    {problem.hasAnimation && (
                      <Badge variant="outline">
                        <Film className="h-3 w-3 mr-1" />
                        Animation
                      </Badge>
                    )}
                    {problem.hasArticle && (
                      <Badge variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Article
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Animation Section */}
          {problem.hasAnimation && problem.animationPath && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Animation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OptimizedGif
                  src={problem.animationPath}
                  alt={`${problem.title} animation`}
                  className="w-full"
                />
              </CardContent>
            </Card>
          )}

          {/* Article Section */}
          {problem.hasArticle && articleContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Article
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                    {articleContent}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-center pt-6">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Problems
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
