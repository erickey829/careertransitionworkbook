"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers,
  Info,
  Download,
  Check,
} from "lucide-react"

export default function Workbook() {
  const [activePage, setActivePage] = useState(1)
  const [chipStates, setChipStates] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const totalPages = 10
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const updateActivePage = useCallback((pageNum: number) => {
    setActivePage(pageNum)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNum = parseInt(
            entry.target.id.replace("page", ""),
            10
          )
          updateActivePage(pageNum)
        }
      })
    }, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [updateActivePage])

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      const bar = document.getElementById("progress-bar")
      if (bar) bar.style.width = `${scrolled}%`
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function navNext() {
    if (activePage < totalPages) {
      const next = activePage + 1
      scrollToPage(next)
    }
  }

  function navPrevious() {
    if (activePage > 1) {
      const prev = activePage - 1
      scrollToPage(prev)
    }
  }

  function scrollToPage(pageNum: number) {
    const target = sectionsRef.current[pageNum - 1]
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  function toggleChip(label: string) {
    setChipStates((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  function handleSubmit() {
    const emailInput = document.getElementById(
      "user-email"
    ) as HTMLInputElement | null

    const email = emailInput?.value || ""

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.")
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const values = [
    "Autonomy",
    "Creativity",
    "Stability",
    "Deep Focus",
    "Collaboration",
    "Prestige",
    "Helping Others",
    "Learning",
  ]

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-secondary z-50">
        <div
          id="progress-bar"
          className="h-full bg-accent w-0 transition-all duration-300"
        />
      </div>

      {/* Floating Navigation Dock */}
      <nav
        className={`nav-dock no-print transition-opacity duration-500 ${
          activePage === 1
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <button
          onClick={navPrevious}
          className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-accent"
          title="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-sm font-semibold text-muted-foreground tabular-nums">
          Page{" "}
          <span className="text-accent">{activePage}</span> of{" "}
          {totalPages}
        </div>

        <button
          onClick={navNext}
          className={`flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-all ${
            activePage === totalPages
              ? "opacity-0 pointer-events-none"
              : ""
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Page 1: Cover */}
      <section
        id="page1"
        ref={(el) => { sectionsRef.current[0] = el }}
        className="page text-center"
      >
        <div className="mb-8">
          <Layers className="mx-auto w-24 h-24 text-accent" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">
          The First Step
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed mb-12">
          A simple starting point for people who know they don{"'"}t want to
          keep doing what they{"'"}re doing — but don{"'"}t know what{"'"}s
          next.
        </p>
        <div className="flex flex-col items-center">
          <button
            onClick={navNext}
            className="px-10 py-5 bg-foreground text-background rounded-full font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-xl"
          >
            Begin the Reflection
          </button>
        </div>
      </section>

      {/* Page 2: Orientation */}
      <section
        id="page2"
        ref={(el) => { sectionsRef.current[1] = el }}
        className="page"
      >
        <h2 className="font-serif text-4xl mb-8 text-foreground">
          Orientation
        </h2>
        <div className="space-y-6 text-lg text-muted-foreground border-l-2 border-accent/20 pl-8 py-4">
          <p>
            Before we start, let{"'"}s lower the stakes. To find your next
            move:
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-sm">
                {"✕"}
              </span>
              You don{"'"}t need a new career yet.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-sm">
                {"✕"}
              </span>
              You don{"'"}t need to find your {'"'}passion.{'"'}
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-sm">
                {"✕"}
              </span>
              You don{"'"}t need to quit your job today.
            </li>
          </ul>
          <div className="mt-12 p-8 bg-accent/10 rounded-2xl text-foreground italic font-medium">
            {'"'}This workbook won{"'"}t give you an answer. It will give you
            direction.{'"'}
          </div>
        </div>
      </section>

      {/* Page 3: Diagnostic */}
      <section
        id="page3"
        ref={(el) => { sectionsRef.current[2] = el }}
        className="page"
      >
        <h2 className="font-serif text-4xl mb-4 text-foreground">
          What{"'"}s Actually Draining You?
        </h2>
        <p className="text-muted-foreground mb-8">
          Let{"'"}s isolate the noise. Be honest—nobody is reading this but
          you.
        </p>

        <label className="font-medium text-foreground">
          The top 3 things that exhaust me at work:
        </label>
        <textarea
          className="input-box"
          rows={3}
          placeholder="1. Meetings that could be emails..."
        />

        <label className="font-medium text-foreground">
          The part of my job I avoid the most:
        </label>
        <input
          type="text"
          className="input-box"
          placeholder="Managing the budget spreadsheets..."
        />

        <label className="font-medium text-foreground">
          The sentence I find myself repeating about work:
        </label>
        <input
          type="text"
          className="input-box"
          placeholder={'"I just need to make it to Friday."'}
        />
      </section>

      {/* Page 4: Values */}
      <section
        id="page4"
        ref={(el) => { sectionsRef.current[3] = el }}
        className="page"
      >
        <h2 className="font-serif text-4xl mb-4 text-foreground">
          What You Want More Of
        </h2>
        <p className="text-muted-foreground mb-8">
          Not a dream life—just a better one. Circle the values that feel
          non-negotiable for your next chapter.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {values.map((v) => (
            <button
              key={v}
              onClick={() => toggleChip(v)}
              className={`chip border px-4 py-2 rounded-full text-sm ${
                chipStates[v]
                  ? "active"
                  : "border-border text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-foreground">More...</label>
            <input
              type="text"
              className="input-box"
              placeholder="Ownership"
            />
          </div>
          <div>
            <label className="font-medium text-foreground">Less...</label>
            <input
              type="text"
              className="input-box"
              placeholder="Client Fire-drills"
            />
          </div>
        </div>

        <label className="font-medium text-foreground">
          If work felt {'"'}good enough,{'"'} my life outside of work would
          look like:
        </label>
        <textarea
          className="input-box"
          rows={2}
          placeholder="I'd have the energy to cook dinner and go for a walk."
        />
      </section>

      {/* Page 5: Confidence Reset */}
      <section
        id="page5"
        ref={(el) => { sectionsRef.current[4] = el }}
        className="page"
      >
        <h2 className="font-serif text-4xl mb-4 text-foreground">
          You{"'"}re Not Starting From Zero
        </h2>
        <p className="text-muted-foreground mb-8">
          We often devalue what comes easily to us. Let{"'"}s inventory your
          existing capital.
        </p>

        <label className="font-medium text-foreground">
          Things I know how to do that I{"'"}ve done for years:
        </label>
        <textarea className="input-box" rows={2} />

        <label className="font-medium text-foreground">
          Skills people underestimate because they{"'"}re {'"'}normal{'"'} to
          me:
        </label>
        <input
          type="text"
          className="input-box"
          placeholder="e.g. Synthesizing complex data into simple decks"
        />

        <label className="font-medium text-foreground">
          People already trust me with:
        </label>
        <input
          type="text"
          className="input-box"
          placeholder="e.g. Navigating difficult internal politics"
        />
      </section>

      {/* Page 6: Directions */}
      <section
        id="page6"
        ref={(el) => { sectionsRef.current[5] = el }}
        className="page"
      >
        <h2 className="font-serif text-4xl mb-8 text-foreground">
          4 Directions Worth Exploring
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              num: 1,
              title: "Same Skill, New Scene",
              desc: "Doing exactly what you do now, but for a company whose mission you actually care about.",
            },
            {
              num: 2,
              title: "Adjacent Skill, New Context",
              desc: "Moving from Sales to Customer Success, or Marketing to Product Analysis.",
            },
            {
              num: 3,
              title: "Reduced Scope",
              desc: "Stepping back from management or high-stress roles to regain time and mental health.",
            },
            {
              num: 4,
              title: "The Hybrid Path",
              desc: "Consulting or freelancing part-time while you pilot a completely new industry.",
            },
          ].map((d) => (
            <div
              key={d.num}
              className="p-6 border border-border rounded-xl hover:border-accent/40 transition-colors"
            >
              <h3 className="font-bold text-accent mb-2">
                {d.num}. {d.title}
              </h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>

        <label className="font-medium text-foreground">
          Which 2 feel worth learning more about?
        </label>
        <input
          type="text"
          className="input-box"
          placeholder="1 and 4..."
        />
      </section>

      {/* Page 7: Low Risk Steps */}
      <section
        id="page7"
        ref={(el) => { sectionsRef.current[6] = el }}
        className="page"
      >
        <h2 className="font-serif text-4xl mb-4 text-foreground">
          Low-Risk Next Steps
        </h2>
        <p className="text-muted-foreground mb-8">
          Action kills anxiety. Choose one small thing you can do this week.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-accent/15 flex-shrink-0 flex items-center justify-center font-bold text-accent">
              1
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-muted-foreground">
                One Conversation
              </label>
              <input
                type="text"
                className="input-box !mt-0"
                placeholder="Ask [Name] how they transitioned into [Field]..."
              />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-accent/15 flex-shrink-0 flex items-center justify-center font-bold text-accent">
              2
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-muted-foreground">
                One Research Task
              </label>
              <input
                type="text"
                className="input-box !mt-0"
                placeholder="Look up the average salary for [Role]..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-foreground text-background rounded-xl flex items-center gap-4">
          <Info className="w-8 h-8 text-accent flex-shrink-0" />
          <p className="text-sm">
            {'"'}None of these require quitting or committing. They are just
            data points.{'"'}
          </p>
        </div>
      </section>

      {/* Page 8: Reflection */}
      <section
        id="page8"
        ref={(el) => { sectionsRef.current[7] = el }}
        className="page"
      >
        <div className="mb-6">
          <span className="text-accent font-bold tracking-widest text-sm uppercase">
            The Final Review
          </span>
        </div>
        <h2 className="font-serif text-4xl mb-4 text-foreground">
          Where You Are Now
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Take a moment to scroll back through your entries. Look at what you
          {"'"}ve labeled as draining, the values you circled, and the skills
          you identified.
          <br />
          <br />
          As you synthesize those previous answers, use this final set of
          questions to ground your progress.
        </p>

        <label className="font-medium text-foreground">
          After reviewing my answers, what I{"'"}m clearer on now:
        </label>
        <textarea
          className="input-box"
          rows={2}
          placeholder="e.g. I realize I don't hate the work, I just hate the lack of autonomy..."
        />

        <label className="font-medium text-foreground">
          Looking back at my skills and directions, what surprised me most:
        </label>
        <textarea className="input-box" rows={2} />

        <label className="font-medium text-foreground">
          As I finish this workbook, what feels lighter in my mind:
        </label>
        <input
          type="text"
          className="input-box"
          placeholder="e.g. Knowing I don't have to quit my job tomorrow to find a path."
        />
      </section>

      {/* Page 9: Normalizing */}
      <section
        id="page9"
        ref={(el) => { sectionsRef.current[8] = el }}
        className="page"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6 text-foreground">
            Why This Still Feels Hard
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              You might still feel a knot in your stomach. That{"'"}s normal.
              Career changes aren{"'"}t just about jobs — they are{" "}
              <strong className="text-foreground">identity shifts</strong>.
            </p>
            <p>
              The fear of wasted time and the habit of overthinking are your
              brain{"'"}s way of trying to keep you safe.
            </p>
            <p className="font-semibold text-foreground mt-8">
              Clarity usually comes in stages — not all at once.
            </p>
          </div>
        </div>
      </section>

      {/* Page 10: Compilation & Lead Gen */}
      <section
        id="page10"
        ref={(el) => { sectionsRef.current[9] = el }}
        className="page text-center"
      >
        <div className="bg-card border-2 border-accent/20 p-8 md:p-12 rounded-3xl shadow-xl">
          <div className="mb-6 inline-flex p-3 bg-accent/10 rounded-2xl">
            <Download className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-serif text-4xl mb-4 text-foreground">
            Your Next Chapter Starts Here
          </h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            You{"'"}ve done the hard work. Enter your email below to receive a{" "}
            <strong className="text-foreground">customized summary</strong> of
            your responses, along with your selected next steps and a
            transition roadmap.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                id="user-email"
                className="input-box text-center !mb-0 text-lg"
                placeholder="your@email.com"
                required
              />

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <span>
                  {submitting ? "Processing..." : "Compile & Email My Summary"}
                </span>
                {!submitting && <ArrowRight className="w-5 h-5" />}
              </button>

              <p className="mt-6 text-xs text-muted-foreground leading-normal">
                By submitting your email, you{"'"}ll receive your workbook
                summary and consent to join a mailing list. Unsubscribe
                anytime.
              </p>
            </div>
          ) : (
            <div className="py-8">
              <div className="mb-4 inline-flex p-3 bg-green-50 rounded-full">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Check your inbox!
              </h3>
              <p className="text-muted-foreground">
                Your summary is being compiled and will arrive in a few
                minutes.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
