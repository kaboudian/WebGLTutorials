/* global require */
require([
  'libs/Abubu.js',
  'text!shaders/init.frag',
  'text!shaders/march.frag',
  'text!shaders/click.frag',
], function(
  abubujs,
  initShader,
  marchShader,
  clickShader,
) {
  'use strict';

  var canvas_1 = document.getElementById('canvas_1');

  // Inputs to the shaders to be modified by through interactions
  var env = {
    dt: 0.05,
    diffCoef: 0.001,
    time: 0,
    running: false,
    skip: 40,
    period: 200,
    clickRadius: 0.1,
    clickPosition: [0, 0],
  };

  // Textures for storing values computed in the shaders
  var texture0 = new abubujs.Float32Texture(512, 512, { pariable: true });
  var texture1 = new abubujs.Float32Texture(512, 512, { pariable: true });

  // Initialize the textures
  var init = new abubujs.Solver({
    fragmentShader: initShader,
    targets: {
      color0: {
        location: 0,
        target: texture0,
      },
      color1: {
        location: 1,
        target: texture1,
      },
    },
  });

  init.render();

  // Initialize the visualization
  var plot = new abubujs.Plot2D({
    target: texture0,
    channel: 'r',
    minValue: 0,
    maxValue: 1,
    colorbar: true,
    canvas: canvas_1,
  });

  plot.init();
  plot.render();

  // Generic specification of march solver, since we need one for each texture
  function marchSolver(inTexture, outTexture) {
    return new abubujs.Solver({
      fragmentShader: marchShader,
      uniforms: {
        inTexture: {
          type: 't',
          value: inTexture,
        },
        dt: {
          type: 'f',
          value: env.dt,
        },
        diffCoef: {
          type: 'f',
          value: env.diffCoef,
        },
        period: {
          type: 'f',
          value: env.period,
        },
      },
      targets: {
        outcolor: { location: 0, target: outTexture },
      },
    });
  }

  // Create the marching solvers
  var march0 = marchSolver(texture0, texture1);
  var march1 = marchSolver(texture1, texture0);

  // March the solvers forward one step each
  function march() {
    march0.render();
    march1.render();
    env.time += env.dt*2;
  }

  // Run the solvers for the designated time period
  function run() {
    if (env.running) {
      for (var i = 0; i < env.skip; ++i) {
        march();
      }
    }

    plot.render();
    window.requestAnimationFrame(run);
  }

  // Solver to handle click inputs
  var click = new abubujs.Solver({
    fragmentShader: clickShader,
    uniforms: {
      inTexture: {
        type: 't',
        value: texture0,
      },
      clickRadius: {
        type: 'f',
        value: env.clickRadius,
      },
      clickPosition: {
        type: 'v2',
        value: env.clickPosition,
      },
    },
    targets: {
      outcolor: { location: 0, target: texture1 },
    },
  });

  // Copy the click changes to both textures
  var clickCopy = new abubujs.Copy(texture1, texture0);

  // Actual listener for mouse events
  var mouseDrag = new abubujs.MouseListener({
    canvas: canvas_1,
    event: 'drag',
    callback: (event) => {
      click.uniforms.clickPosition.value = event.position;
      click.render();
      clickCopy.render();
    },
  });

  // GUI for modifying solver parameters and behavior
  function createGui() {
    var gui = new abubujs.Gui();
    var panel = gui.addPanel();

    panel.add(env, 'time').listen();
    panel.add(env, 'skip');
    panel.add(env, 'period').onChange(() => {
      march0.uniforms.period.value = env.period;
      march1.uniforms.period.value = env.period;
    });
    panel.add(env, 'running');
  }

  // Display the GUI and begin the animation cycle
  createGui();
  run();
});

