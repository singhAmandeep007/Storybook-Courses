import "../src/index.css";

// Registers the msw addon
import { initialize, mswDecorator } from "msw-storybook-addon";

// Initialize MSW
initialize();

// Configures Storybook to log the actions( onArchiveTask and onPinTask )
// in the UI
/** @type { import('@storybook/react').Preview } */
const preview = {
  // enable API mocking
  decorators: [mswDecorator],
  parameters: {
    // configure how the actions (mocked callbacks) are handled.
    // when we build a pin button,
    // we’ll be able to determine if a button click is successful in the UI.
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
