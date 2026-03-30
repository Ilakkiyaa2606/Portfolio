import { useState, useEffect } from 'react'

interface UseTypewriterProps {
  text: string
  speed?: number
  delay?: number
}

export const useTypewriter = ({ text, speed = 50, delay = 0 }: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let currentIndex = 0

    const startTyping = () => {
      const typeNextCharacter = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
          timeout = setTimeout(typeNextCharacter, speed)
        } else {
          setIsComplete(true)
        }
      }

      timeout = setTimeout(typeNextCharacter, delay)
    }

    startTyping()

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayText, isComplete }
}
