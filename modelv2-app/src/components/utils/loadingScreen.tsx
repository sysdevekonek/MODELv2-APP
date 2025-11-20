"use client"

export default function LoadingScreen() {
  return (
    <div className="loading-overlay">
      <div className="icon">
        <img src="/modellayer1.svg" alt="Layer 1" className="part part1" />
        <img src="/modellayer2.svg" alt="Layer 2" className="part part2" />
        <img src="/modellayer3.svg" alt="Layer 3" className="part part3" />
      </div>
    </div>
  )
}
