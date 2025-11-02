import { getAllProblems } from "@/lib/problems"
import { ProblemsList } from "@/components/problems-list"

export default function Home() {
  const problems = getAllProblems()

  return <ProblemsList problems={problems} />
}
