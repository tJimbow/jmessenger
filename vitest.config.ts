import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/unit/**/*.spec.ts"],
      environment: 'jsdom',
      reporters: ["default", "html", "junit"],
      exclude: [...configDefaults.exclude],
      coverage: {
          provider: "istanbul",
          reportsDirectory: "coverage/unit",
          reporter: ["html", "text-summary", "lcov"],
          include: ["src/"],
          exclude: ["src/router/**", "src/stores/**"],
      },
      outputFile: {
          junit: "test-result/junit.xml",
          html: "test-result/index.html",
      },
    },
  })
)
