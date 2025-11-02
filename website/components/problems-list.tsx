"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Code2, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Problem } from "@/lib/problems"

interface ProblemsListProps {
  problems: Problem[]
}

export function ProblemsList({ problems }: ProblemsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(problems.map(p => p.category).filter(Boolean))
    return Array.from(cats).sort()
  }, [problems])

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.number.toString().includes(searchQuery)
      
      const matchesCategory = !selectedCategory || problem.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [problems, searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <h1 className="text-xl font-bold">LeetCode Animation</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container px-4 py-12 mx-auto max-w-7xl">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Visualize LeetCode Problems
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Learn algorithms through animations and detailed explanations
            </p>
            <div className="flex items-center gap-4 justify-center text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{problems.length} Problems</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                <span>{problems.filter(p => p.hasAnimation).length} Animations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by problem number or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category || null)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Showing {filteredProblems.length} of {problems.length} problems
        </div>

        {/* Problems Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map(problem => (
            <Link key={problem.id} href={`/problem/${problem.slug}`}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">
                      #{problem.number} {problem.title}
                    </CardTitle>
                  </div>
                  <CardDescription>{problem.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {problem.hasAnimation && (
                      <Badge variant="secondary">
                        🎬 Animation
                      </Badge>
                    )}
                    {problem.hasArticle && (
                      <Badge variant="outline">
                        📝 Article
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">
              No problems found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
