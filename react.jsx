import { useEffect, useState } from "react"

export default function UntitledStudios() {
  const [gradientColors, setGradientColors] = useState(["#ffffff", "#93c5fd"])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const gameImages = {
    gorillaslab: [
      "https://i.imgur.com/9OAjV7b.jpeg",
      "https://i.imgur.com/MV3lEWg.jpeg",
      "https://i.imgur.com/ThnoUo2.jpeg",
      "https://i.imgur.com/MSq52Mr.jpeg"
    ],
    howlerpvp: [
      "https://i.imgur.com/ZCFnme2.jpeg",
      "https://i.imgur.com/TRvCpZD.jpeg",
      "https://i.imgur.com/SZASFlY.jpeg"
    ],
    langurrun: [
      "https://i.imgur.com/99Rw9PK.jpeg",
      "https://i.imgur.com/6KvJFAn.jpeg",
      "https://i.imgur.com/yaCeQKg.jpeg"
    ]
  }

  const metaLinks = {
    gorillaslab: "https://www.meta.com/experiences/gorillas-lab/9945172845577818/",
    howlerpvp: "https://www.meta.com/experiences/howler-pvp/6359025934116346/",
    langurrun: "https://www.meta.com/experiences/langur-run/6918495718241416/"
  }

  const handleScroll = () => {
    const sections = document.querySelectorAll("section")
    let current = "default"
    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2)
        current = section.id
    })

    switch (current) {
      case "gorillaslab":
        setGradientColors(["#facc15", "#f97316"]) // yellow → orange
        break
      case "langurrun":
        setGradientColors(["#60a5fa", "#facc15"]) // blue → yellow
        break
      case "howlerpvp":
        setGradientColors(["#ef4444", "#000000"]) // red → black
        break
      default:
        setGradientColors(["#ffffff", "#93c5fd"]) // white → blue
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => prev + 1)
    }, 3000)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [])

  const getCurrentImage = gameId =>
    gameImages[gameId][currentImageIndex % gameImages[gameId].length]

  const gameInfo = {
    langurrun: {
      title: "Langur Run",
      desc: "Run around and explore in a social game, V2 coming soon...",
      tags: ["Social", "Platformer", "Party"]
    },
    gorillaslab: {
      title: "Gorillas Lab",
      desc: "Where Gorilla Tag meets BONELAB",
      tags: ["Simulator", "Sandbox", "Action"]
    },
    howlerpvp: {
      title: "Howler PVP",
      desc: "Hide, or fight. PVP is key",
      tags: ["FPS", "Action", "Platformer"]
    }
  }

  const gradientStyle = {
    background: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`,
    transition: "background 1s ease-in-out"
  }

  return (
    <div className="min-h-screen" style={{ ...gradientStyle, fontFamily: "iA Writer Duospace, monospace" }}>
      <header className="relative w-full h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold text-black relative z-10">Untitled Studios</h1>
      </header>

      {["gorillaslab", "langurrun", "howlerpvp"].map(gameId => (
        <section
          key={gameId}
          id={gameId}
          className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between p-10 gap-10"
        >
          <div className="md:w-1/2 flex flex-col justify-center h-full">
            <h2 className="text-4xl font-bold mb-2 text-white">{gameInfo[gameId].title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {gameInfo[gameId].tags.map((tag, i) => (
                <span key={i} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg mb-6 text-white">{gameInfo[gameId].desc}</p>
            <div className="flex gap-4 flex-wrap">
              <a
                href={metaLinks[gameId]}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-black px-6 py-3 rounded-xl font-bold shadow-lg inline-block"
              >
                View on Meta
              </a>
              <a
                href="#"
                className="bg-blue-500 px-6 py-3 rounded-xl font-bold shadow-lg inline-block"
              >
                Join Discord
              </a>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex justify-center h-full">
            <img
              src={getCurrentImage(gameId)}
              className="w-full h-[500px] md:h-[600px] object-cover rounded-xl shadow-xl transition-all duration-700"
            />
          </div>
        </section>
      ))}

      <footer className="w-full text-center py-6 text-gray-200 bg-black">
        © {new Date().getFullYear()} Untitled Studios. All rights reserved.
      </footer>
    </div>
  )
}
