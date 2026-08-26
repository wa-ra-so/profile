import { Card } from '@heroui/react'
import { AnimatePresence, type PanInfo, motion } from 'framer-motion'
import { useState } from 'react'

type Slide = {
  question: string
  answer: string
  bg: string
  title: string
  body: string
}

const slides: Slide[] = [
  {
    question: '社会人になって一番「大人になったな」と思った瞬間は？',
    answer:
      '毎月の経費をExcelで説明できるようになったとき。食べログの複雑さがやっと理解できた。',
    bg: 'bg-amber-100',
    title: 'text-amber-900',
    body: 'text-amber-800',
  },
  {
    question: 'もし明日から1ヵ月急に休みになったら何をする？',
    answer: '登米に帰って、飲食店の下見ツアー。いつかの店のために食べ歩き&リサーチ三昧。',
    bg: 'bg-sky-100',
    title: 'text-sky-900',
    body: 'text-sky-800',
  },
  {
    question: '自分を料理・食べ物に例えるなら何？',
    answer: 'ラーメンのスープ。奥深くて、一度ハマると脱出不可。毎日新しい味わいが発見できる。',
    bg: 'bg-pink-100',
    title: 'text-pink-900',
    body: 'text-pink-800',
  },
]

const SWIPE_OFFSET_THRESHOLD = 50
const SWIPE_VELOCITY_THRESHOLD = 300

function App() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (next: number) => {
    if (next < 0 || next >= slides.length) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const isFastFlick = Math.abs(info.velocity.x) > SWIPE_VELOCITY_THRESHOLD
    const isFarDrag = Math.abs(info.offset.x) > SWIPE_OFFSET_THRESHOLD
    if (!isFastFlick && !isFarDrag) return

    if (info.offset.x < 0 || info.velocity.x < 0) goTo(index + 1)
    else goTo(index - 1)
  }

  const slide = slides[index]

  return (
    <div className="flex min-h-svh items-center justify-center bg-linear-to-br from-indigo-500 to-purple-700 p-5">
      <div className="w-full max-w-sm">
        <div className="mb-5 text-center text-white">
          <h1 className="text-2xl font-semibold">菅原さん</h1>
          <p className="text-sm opacity-90">
            {index + 1} / {slides.length}
          </p>
        </div>

        <div className="relative h-[420px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              initial={{ x: direction >= 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction >= 0 ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              dragTransition={{ bounceStiffness: 700, bounceDamping: 28 }}
              whileDrag={{ cursor: 'grabbing' }}
              onDragEnd={handleDragEnd}
              className="absolute h-full w-full cursor-grab touch-pan-y"
            >
              <Card className={`h-full w-full border-none ${slide.bg}`}>
                <Card.Content className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
                  <h3 className={`text-sm leading-relaxed font-medium opacity-80 ${slide.title}`}>
                    {slide.question}
                  </h3>
                  <p className={`text-2xl leading-snug font-bold ${slide.body}`}>{slide.answer}</p>
                </Card.Content>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.question}
              type="button"
              aria-label={`${i + 1}枚目を表示`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <p className="mt-5 text-center text-sm text-white/80">← スワイプで進む →</p>

        <div className="mt-8 rounded-xl bg-white/95 p-4 text-center text-sm leading-relaxed text-neutral-800">
          このページの URL を QR コード化すれば、懇親会で配布できます。
        </div>
      </div>
    </div>
  )
}

export default App
