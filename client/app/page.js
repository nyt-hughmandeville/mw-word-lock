'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { words } from '/data/words.js'

const Page = () => {
  const [letters, setLetters] = useState([])
  const [word, setWord] = useState('')

  useEffect(() => {
    setupLetters()
  }, [])

  const setupLetters = () => {
    let ltrs = randomLetters()

    // Get a random valid word.
    const validWords = Object.keys(words)
    const randomWord = validWords[Math.floor(Math.random() * validWords.length)]
    setWord(randomWord)
    console.log('randomWord', randomWord)
    const rls = randomWord.split('')

    // Set the word's letters in random rows.
    for (let i = 0; i < rls.length; i++) {
      const rowIndex = Math.floor(Math.random() * 5)
      ltrs[rowIndex][i] = rls[i]
    }

    // Make sure the middle row doesn't start as a valid word.
    for (let i = 0; i < 5; i++) {
      if (isRowValidWord(2)) {
        break
      }
      const ci = Math.floor(Math.random() * 5)
      rotateColunmn(ci, 'up')
    }

    setLetters(ltrs)
  }

  // Revel word.
  const revealWord = () => {
    const wls = word.split('')
    for (let ci = 0; ci < 5; ci++) {
      // rotate column up until the letter is in the middle row.
      while (letters[2][ci] !== wls[ci]) {
        rotateColunmn(ci, 'up')
      }
    }
  }

  // Rotate the letters in a column up or down.
  const rotateColunmn = (colIndex, direction) => {
    let ltrs = letters
    if (ltrs.length !== 5) {
      return
    }
    if (direction === 'up') {
      const temp = ltrs[0][colIndex]
      ltrs[0][colIndex] = ltrs[1][colIndex]
      ltrs[1][colIndex] = ltrs[2][colIndex]
      ltrs[2][colIndex] = ltrs[3][colIndex]
      ltrs[3][colIndex] = ltrs[4][colIndex]
      ltrs[4][colIndex] = temp
      setLetters([...ltrs])
      return
    }

    const temp = ltrs[4][colIndex]
    ltrs[4][colIndex] = ltrs[3][colIndex]
    ltrs[3][colIndex] = ltrs[2][colIndex]
    ltrs[2][colIndex] = ltrs[1][colIndex]
    ltrs[1][colIndex] = ltrs[0][colIndex]
    ltrs[0][colIndex] = temp
    setLetters([...ltrs])
  }

  // Generate 5x5 grid of random letters.
  const randomLetters = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    return Array.from({ length: 5 }, () =>
      Array.from(
        { length: 5 },
        () => alphabet[Math.floor(Math.random() * alphabet.length)]
      )
    )
  }

  // Check if the word in the row is valid.
  const isRowValidWord = (rowIndex) => {
    if (letters.length !== 5) {
      return false
    }
    const word = letters[rowIndex].join('')
    return words[word]
  }

  const getClasses = (rowIndex) => {
    if (rowIndex === 2) {
      if (isRowValidWord(rowIndex)) {
        return `${styles.cell} ${styles.letter} ${styles.correct}`
      }
    }
    return `${styles.cell} ${styles.letter}`
  }

  const handleClick = (rowIndex, colIndex) => {
    if (rowIndex < 2) {
      rotateColunmn(colIndex, 'up')
    } else if (rowIndex >= 2) {
      rotateColunmn(colIndex, 'down')
    }
  }

  const grid = letters.map((row, rowIndex) => (
    <React.Fragment key={'row-' + rowIndex}>
      {row.map((letter, colIndex) => (
        <React.Fragment key={'letter-' + rowIndex + '-' + colIndex}>
          <div
            className={getClasses(rowIndex)}
            onClick={() => handleClick(rowIndex, colIndex)}
            title="Click to rotate column"
          >
            {letter}
          </div>
        </React.Fragment>
      ))}
    </React.Fragment>
  ))

  return (
    <>
      <nav>
        <div className={styles.title}>
          <a href="/">Word Lock</a>
        </div>
        <div className={styles.buttons}>
          <div
            className={styles.button + ' material-symbols-outlined'}
            onClick={() => revealWord()}
            title={isRowValidWord(2) ? 'Unlocked' : 'Reveal word'}
          >
            {isRowValidWord(2) ? 'lock_open' : 'lock'}
          </div>
          <div
            className={styles.button + ' material-symbols-outlined'}
            title="Show help"
          >
            help
          </div>
          <div
            className={styles.button + ' material-symbols-outlined'}
            onClick={() => setupLetters()}
            title="Start new game"
          >
            refresh
          </div>
        </div>
      </nav>
      <div className={styles.content}>
        <div className={styles.grid}>{grid}</div>
      </div>
    </>
  )
}

export default Page
