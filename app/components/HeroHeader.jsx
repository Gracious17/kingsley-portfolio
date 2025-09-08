import React from 'react'
import { WordRotate } from "./magicui/word-rotate";

const HeroHeader = () => {
  return (

<>

          <div className="items-center flex flex-col justify-center ">
            <div className='flex '>
              <h1 className="py-4 text-gray-700 dark:text-white   ">
                Hi, i&apos;m{" "}
              </h1>
              <WordRotate
                className="text-[#5451e5] inline-block min-w-[160px]"
                words={["-Gracious", " -Kingsley "]}
              />
            </div>

            <div className='flex '>
              <h1 className="py-2 text-gray-700 dark:text-white">
                A Full-Stack{" "}
                </h1>
                <WordRotate
                  className="text-[#5451e5] "
                  words={["-Web Dev", " -Mobile Dev "]}
                />
            </div>
          </div>
</>
)
}

export default HeroHeader