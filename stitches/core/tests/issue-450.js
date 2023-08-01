import { createStitches } from '../src/index.js';

describe('Issue #450', () => {
  test('Basic Tests', () => {
    const getFreshComponents = () => {
      const { css, getCssText } = createStitches();

      const component1 = css({
        variants: {
          color: {
            red: {
              color: 'red',
            },
            blue: {
              color: 'blue',
            },
          },
        },
        defaultVariants: {
          color: 'red',
        },
      });

      const component2 = css(component1, {
        variants: {
          color: {
            orange: {
              color: 'orange',
            },
          },
        },

        defaultVariants: {
          color: 'orange',
        },
      });

      const component3 = css(component2, {
        variants: {
          color: {
            purple: {
              color: 'rebeccapurple',
            },
          },
        },

        defaultVariants: {
          color: 'purple',
        },
      });

      return { component1, component2, component3, getCssText };
    };

    test('Render component1() as red, inherited from defaultVariants', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1();
      expect(render.className).toBe(`fuel_PJLV fuel_PJLV-gmqXFB-color-red`);
      expect(getCssText()).toBe(
        `--sxs{--sxs:3 fuel_PJLV-gmqXFB-color-red}@media{.fuel_PJLV-gmqXFB-color-red{color:red}}`,
      );
    });

    test('Render component1({ color: "blue" }) as blue, assigned from props', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1({ color: 'blue' });
      expect(render.className).toBe(`fuel_PJLV fuel_PJLV-kydkiA-color-blue`);
      expect(getCssText()).toBe(
        `--sxs{--sxs:3 fuel_PJLV-kydkiA-color-blue}@media{.fuel_PJLV-kydkiA-color-blue{color:blue}}`,
      );
    });

    test('Render component1({ color: "red" }) as red, assigned from props', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1({ color: 'red' });
      expect(render.className).toBe(`fuel_PJLV fuel_PJLV-gmqXFB-color-red`);
      expect(getCssText()).toBe(
        `--sxs{--sxs:3 fuel_PJLV-gmqXFB-color-red}@media{.fuel_PJLV-gmqXFB-color-red{color:red}}`,
      );
    });

    test('Render component1({ color: { "@media (width >= 640px)": "blue" } }) as red then blue, inherited from defaultVariants, assigned from props', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1({
        color: { '@media (min-width: 640px)': 'blue' },
      });
      expect(render.className).toBe(
        `fuel_PJLV fuel_PJLV-gmqXFB-color-red fuel_PJLV-bBevdw-color-blue`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:3 fuel_PJLV-gmqXFB-color-red}@media{.fuel_PJLV-gmqXFB-color-red{color:red}}--sxs{--sxs:4 fuel_PJLV-bBevdw-color-blue}@media{@media (min-width: 640px){.fuel_PJLV-bBevdw-color-blue{color:blue}}}`,
      );
    });

    test('Render component2() as orange, inherited from defaultVariants', () => {
      const { component2, getCssText } = getFreshComponents();
      const render = component2();

      expect(render.className).toBe(`fuel_PJLV fuel_PJLV-vMTTG-color-orange`);
      expect(getCssText()).toBe(
        `--sxs{--sxs:3 fuel_PJLV-vMTTG-color-orange}@media{.fuel_PJLV-vMTTG-color-orange{color:orange}}`,
      );
    });

    test('Render component2({ color: { "@media (width >= 640px)": "blue" } }) as orange then blue, inherited from defaultVariants, assigned from props', () => {
      const { component2, getCssText } = getFreshComponents();
      const render = component2({
        color: { '@media (min-width: 640px)': 'blue' },
      });
      expect(render.className).toBe(
        `fuel_PJLV fuel_PJLV-bBevdw-color-blue fuel_PJLV-vMTTG-color-orange`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:3 fuel_PJLV-vMTTG-color-orange}` +
          `@media{.fuel_PJLV-vMTTG-color-orange{color:orange}}` +
          `--sxs{--sxs:4 fuel_PJLV-bBevdw-color-blue}@media{` +
          `@media (min-width: 640px){.fuel_PJLV-bBevdw-color-blue{color:blue}}` +
          `}`,
      );
    });
  });

  test('Basic Tests ported from the React version', () => {
    const getFreshComponents = () => {
      const { css, getCssText } = createStitches();

      const component1 = css({
        '--component': 1,

        variants: {
          appearance: {
            primary: {},
            secondary: { '--appearance': 'secondary' },
          },
          color: {
            red: {},
            purple: { '--color': 'purple' },
            lightBlue: { '--color': 'lightBlue' },
          },
        },

        compoundVariants: [
          {
            appearance: 'secondary',
            color: 'lightBlue',
            css: {
              '--compound': 'appearance secondary / color lightBlue',
            },
          },
        ],

        defaultVariants: {
          appearance: 'primary',
          color: 'red',
        },
      });

      const component2 = css(component1, {
        '--component': 2,

        defaultVariants: {
          appearance: 'secondary',
          color: 'lightBlue',
        },
      });

      return { component1, component2, getCssText };
    };

    test('Render component1()', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1();
      expect(render.className).toBe(`fuel_jyxqjt`);
      expect(getCssText()).toBe(
        `--sxs{--sxs:2 fuel_jyxqjt}@media{.fuel_jyxqjt{--component:1}}`,
      );
    });

    test('Render component1({ color: "lightBlue" })', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1({ color: 'lightBlue' });
      expect(render.className).toBe(
        `fuel_jyxqjt fuel_jyxqjt-ilDyRi-color-lightBlue`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:2 fuel_jyxqjt}@media{` +
          `.fuel_jyxqjt{--component:1}` +
          `}` +
          `--sxs{--sxs:3 fuel_jyxqjt-ilDyRi-color-lightBlue}@media{` +
          `.fuel_jyxqjt-ilDyRi-color-lightBlue{--color:lightBlue}` +
          `}`,
      );
    });

    test('Render component1({ appearance: "secondary" })', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1({ appearance: 'secondary' });
      expect(render.className).toBe(
        `fuel_jyxqjt fuel_jyxqjt-cOChOn-appearance-secondary`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:2 fuel_jyxqjt}@media{` +
          `.fuel_jyxqjt{--component:1}` +
          `}` +
          `--sxs{--sxs:3 fuel_jyxqjt-cOChOn-appearance-secondary}@media{` +
          `.fuel_jyxqjt-cOChOn-appearance-secondary{--appearance:secondary}` +
          `}`,
      );
    });

    test('Render component1({ appearance: "secondary", color: "lightBlue" })', () => {
      const { component1, getCssText } = getFreshComponents();
      const render = component1({
        appearance: 'secondary',
        color: 'lightBlue',
      });
      expect(render.className).toBe(
        `fuel_jyxqjt fuel_jyxqjt-cOChOn-appearance-secondary fuel_jyxqjt-ilDyRi-color-lightBlue fuel_jyxqjt-gYqlvA-cv`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:2 fuel_jyxqjt}@media{` +
          `.fuel_jyxqjt{--component:1}` +
          `}` +
          `--sxs{--sxs:3 fuel_jyxqjt-cOChOn-appearance-secondary fuel_jyxqjt-ilDyRi-color-lightBlue}@media{` +
          `.fuel_jyxqjt-cOChOn-appearance-secondary{--appearance:secondary}` +
          `.fuel_jyxqjt-ilDyRi-color-lightBlue{--color:lightBlue}` +
          `}` +
          `--sxs{--sxs:5 fuel_jyxqjt-gYqlvA-cv}@media{` +
          `.fuel_jyxqjt-gYqlvA-cv{--compound:appearance secondary / color lightBlue}` +
          `}`,
      );
    });

    test('Render component2()', () => {
      const { component2, getCssText } = getFreshComponents();
      const render = component2();
      expect(render.className).toBe(
        `fuel_jyxqjt fuel_dkRcuu fuel_jyxqjt-cOChOn-appearance-secondary fuel_jyxqjt-ilDyRi-color-lightBlue fuel_jyxqjt-gYqlvA-cv`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:2 fuel_jyxqjt fuel_dkRcuu}@media{` +
          `.fuel_jyxqjt{--component:1}` +
          `.fuel_dkRcuu{--component:2}` +
          `}` +
          `--sxs{--sxs:3 fuel_jyxqjt-cOChOn-appearance-secondary fuel_jyxqjt-ilDyRi-color-lightBlue}@media{` +
          `.fuel_jyxqjt-cOChOn-appearance-secondary{--appearance:secondary}` +
          `.fuel_jyxqjt-ilDyRi-color-lightBlue{--color:lightBlue}` +
          `}` +
          `--sxs{--sxs:5 fuel_jyxqjt-gYqlvA-cv}@media{` +
          `.fuel_jyxqjt-gYqlvA-cv{--compound:appearance secondary / color lightBlue}` +
          `}`,
      );
    });

    test('Render component2({ appearance: "secondary", color: "lightBlue" })', () => {
      const { component2, getCssText } = getFreshComponents();
      const render = component2({
        appearance: 'secondary',
        color: 'lightBlue',
      });
      expect(render.className).toBe(
        `fuel_jyxqjt fuel_dkRcuu fuel_jyxqjt-cOChOn-appearance-secondary fuel_jyxqjt-ilDyRi-color-lightBlue fuel_jyxqjt-gYqlvA-cv`,
      );
      expect(getCssText()).toBe(
        `--sxs{--sxs:2 fuel_jyxqjt fuel_dkRcuu}@media{` +
          `.fuel_jyxqjt{--component:1}` +
          `.fuel_dkRcuu{--component:2}` +
          `}` +
          `--sxs{--sxs:3 fuel_jyxqjt-cOChOn-appearance-secondary fuel_jyxqjt-ilDyRi-color-lightBlue}@media{` +
          `.fuel_jyxqjt-cOChOn-appearance-secondary{--appearance:secondary}` +
          `.fuel_jyxqjt-ilDyRi-color-lightBlue{--color:lightBlue}` +
          `}` +
          `--sxs{--sxs:5 fuel_jyxqjt-gYqlvA-cv}@media{` +
          `.fuel_jyxqjt-gYqlvA-cv{--compound:appearance secondary / color lightBlue}` +
          `}`,
      );
    });
  });
});
