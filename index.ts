#! /usr/bin/env node

import sh from 'shelljs'
import { colors } from './src/colors.js'
import { program } from './src/commander.js'
import { getTemplate } from './src/getTemplate.js'
import { precheck } from './src/precheck.js'
import { initAnimation } from './src/animation.js'

export const main = () => {
  console.log(colors.info('\nStarting cli...'))

  // Check to see if sh deps are installed
  precheck()

  // Read params from cli
  program.parse(process.argv)

  const options = program.opts()

  if (!options.projectName) {
    sh.exit(0)
  }

  const result = getTemplate(options)

  if (result?.path && result?.replacementName && result?.repo) {
    const projectName = options.projectName
    const { path, replacementName, repo } = result
    console.log(colors.warning(`Creating project ${projectName} in ${path}`))

    const animation = initAnimation()

    sh.exec(`git clone ${repo} ${projectName}`)
    sh.cd(path)

    // Remove the .git folder
    sh.exec(`rm -rf .git`)

    // Replace all instances of template name with new project name
    sh.ls('*.*').forEach(file => {
      sh.sed('-i', replacementName, projectName, file)
    })
    sh.cd('../')

    clearInterval(animation)

    // Print our done message
    console.log(colors.info.bold('Complete! 🎉'))
  }
}

main()
