import React from 'react';
import { includes } from 'lodash';

import { ETAPairingColors } from 'common/consts';
import { ETAPairing, ETATypes, Nullable } from 'common/types';
import { EquityBoxProps } from './EquityBox.props';

const fillColor = (active: boolean, stroke: string) => {
  return active ? 'currentColor' : stroke;
}

const pairColor = (etaType: ETATypes, etaPairing: Nullable<ETAPairing>) => {
  return !!etaPairing && ETAPairingColors[etaType] === etaPairing
}

const EquityBoxView: React.FC<EquityBoxProps> = ({
  etaPairing = null,
  width = 480,
  height = 480,
  hideCube = false,
  hideMessage = false,
  strokeColor = '#cccccc',
  ...props
}) => {
  const showStrategies = !hideCube ? 'visible' : 'hidden';

  const handleSelect = (name: string) => () => {
    if (props?.onSelectETA) {
      props.onSelectETA(name as ETATypes);
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 582 594"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="equity-box"
    >
      {/* MaxGrowth */}
      <path
        d="M71.6404 100.051L68.3266 101.926L85.6066 112.103L88.971 110.2L78.3275 103.931L89.6094 106.253L91.7596 105.036L87.9408 98.4057L98.6594 104.718L102.049 102.801L84.769 92.6236L81.4047 94.5271L85.9642 102.821L71.6404 100.051ZM100.724 99.2705C103.278 100.775 106.477 100.556 109.108 99.0673C110.575 98.2372 110.858 97.5276 110.512 96.7399L111.614 97.3888L114.776 95.5999L106.562 90.7621C102.981 88.653 100.183 89.1373 96.9194 90.9835C94.3139 92.4576 93.4483 93.5836 94.04 95.0128L97.8943 94.6539C97.5991 93.8667 98.0309 93.4199 99.2704 92.7187C101.092 91.6882 101.973 91.7104 103.375 92.5364L104.101 92.9641L101.597 94.3809C98.9409 95.8837 98.0692 97.7071 100.724 99.2705ZM106.931 94.6307C108.634 95.6337 108.552 96.4031 107.085 97.2332C105.972 97.8629 104.787 98.0125 103.836 97.452C102.859 96.8768 103.015 96.2969 104.33 95.5527L106.455 94.3505L106.931 94.6307ZM128.318 87.9384L117.733 86.524L115.442 80.7641L111.875 82.7821L113.332 86.0934L107.626 85.1865L104.059 87.2044L113.989 88.6422L116.252 94.7651L119.819 92.7471L118.466 89.117L124.726 89.9706L128.318 87.9384ZM127.701 78.5422L129.053 79.3386L133.783 76.6623C137.864 79.2408 137.771 81.2018 134.862 82.8476C131.903 84.5221 128.429 84.521 123.721 81.7481L121.667 80.5387C116.959 77.7659 117.027 75.7611 119.987 74.0866C122.415 72.7127 125.287 72.4179 128.724 73.7992L130.165 72.9835C125.827 71.0712 121.72 71.5441 118.634 73.2902C114.84 75.4369 114.615 78.0797 120.2 81.3688L122.254 82.5782C127.838 85.8673 132.42 85.7909 136.215 83.6441C140.11 81.4401 140.134 78.6793 134.625 75.4345L133.924 75.0215L127.701 78.5422ZM138.595 68.9949C139.708 68.3652 140.893 68.1866 142.402 68.3159L142.714 67.1561C140.778 66.9794 139.064 67.2261 137.419 68.1564C135.826 69.058 135.465 70.0721 136.085 71.0511L134.382 70.0482L132.991 70.8353L145.513 78.2099L146.904 77.4228L139.366 72.9833C137.087 71.6411 136.622 70.1112 138.595 68.9949ZM159.475 64.1221L157.647 63.0454C154.091 60.951 150.265 60.8887 147.027 62.7206C143.789 64.5525 143.82 66.7616 147.377 68.856L149.205 69.9327C152.711 71.9975 156.586 72.1184 159.849 70.2722C163.239 68.3544 162.881 66.128 159.475 64.1221ZM158.084 64.9092C160.713 66.4579 161.026 68.1317 158.572 69.52C156.017 70.9655 153.226 70.6942 150.596 69.1455L148.768 68.0688C146.038 66.4612 145.876 64.8467 148.304 63.4728C150.708 62.1132 153.526 62.2249 156.256 63.8325L158.084 64.9092ZM178.547 59.5201L179.787 58.8188L170.933 49.369L169.466 50.1991L176.574 57.7446L162.863 53.9344L161.674 54.6071L168.05 62.5386L155.173 58.2852L153.706 59.1153L169.896 64.4147L171.135 63.7134L164.511 55.5472L178.547 59.5201ZM173.125 49.6035L174.744 48.6875L182.132 53.0386C184.736 54.5725 186.798 54.852 189.606 53.2634L190.491 52.7624L189.164 51.9807L188.329 52.453C186.28 53.6123 185.151 53.2101 183.147 52.0302L176.135 47.9004L179.247 46.1401L177.969 45.3878L174.858 47.1482L172.103 45.5258L170.712 46.3129L173.467 47.9353L171.848 48.8513L173.125 49.6035ZM193.264 51.1936L194.655 50.4065L187.142 45.9817C184.838 44.6248 184.475 43.0377 186.852 41.6924C188.825 40.5761 191.394 40.424 194.249 42.1054L201.637 46.4564L203.028 45.6693L195.615 41.3035C192.084 39.2239 188.51 39.2509 185.702 40.8395C183.83 41.8986 183.317 42.9404 183.837 44.0348L177.375 40.2295L175.984 41.0167L193.264 51.1936ZM193.058 29.3881L203.426 35.4943L210.044 31.7503L207.97 30.5291L203.872 32.8476L201.618 31.5202L205.261 29.4593L203.187 28.238L199.545 30.2989L197.651 29.1839L201.749 26.8654L199.676 25.6441L193.058 29.3881ZM200.67 25.0818L202.743 26.3031L205.475 24.7574L213.77 29.6423L216.289 28.2169L207.995 23.3319L210.727 21.7863L208.653 20.565L200.67 25.0818ZM221.554 25.2384L220.327 23.885L223.56 22.0559L225.894 22.7825L228.581 21.2626L214.57 17.2173L212.142 18.5912L218.867 26.7583L221.554 25.2384ZM216.812 19.9396L220.833 21.204L218.906 22.2945L216.812 19.9396Z"
        className="fill-MaxGrowth"
        fill={fillColor(pairColor('MaxGrowth', etaPairing), strokeColor)}
        fillRule="evenodd"
        visibility={showStrategies}
      />
      <path
        d="M256.496 1.7843L276.208 13.1705L49.7812 143.891L30.5232 132.816"
        stroke={fillColor(pairColor('MaxGrowth', etaPairing), strokeColor)}
        strokeWidth="2"
        className="fill-MaxGrowth"
        visibility={showStrategies}
      />
      {/* MaxDiv */}
      <path
        d="M21.5698 3.53508L18.256 1.66024L0.975977 11.8372L4.34035 13.7407L14.9838 7.47224L11.1895 14.0299L13.3397 15.2464L24.7473 12.9094L14.0287 19.2221L17.4184 21.1398L34.6984 10.9629L31.334 9.05943L17.0608 11.8573L21.5698 3.53508ZM23.506 20.3042C20.9516 21.8086 21.3955 23.6503 24.0263 25.1387C25.4934 25.9688 26.7281 26.1179 28.0855 25.9026L26.9836 26.5516L30.1456 28.3406L38.3599 23.5028C41.9411 21.3937 41.0462 19.7885 37.783 17.9423C35.1775 16.4681 33.21 15.9912 30.7463 16.3613L31.4452 18.5786C32.8029 18.3924 33.5853 18.6327 34.8248 19.3339C36.6461 20.3644 36.6254 20.8732 35.2229 21.6991L34.4967 22.1268L31.9924 20.71C29.3363 19.2072 26.1606 18.7408 23.506 20.3042ZM31.6668 23.7935C29.9638 24.7965 28.6294 24.7645 27.1623 23.9344C26.0492 23.3046 25.7664 22.6241 26.7181 22.0637C27.6948 21.4884 28.7023 21.5669 30.0177 22.3111L32.1426 23.5133L31.6668 23.7935ZM43.6873 36.0021L45.9246 29.8648L55.8549 28.4271L52.2882 26.4092L46.5821 27.3161L48.0384 24.0048L44.4717 21.9868L42.1808 27.7467L31.6211 29.1754L35.1878 31.1933L41.4482 30.3397L40.0953 33.9698L43.6873 36.0021ZM51.4338 40.3848C55.3041 42.5746 59.7863 42.7681 65.371 39.479L67.4246 38.2696C73.0093 34.9805 72.5841 32.3976 68.7138 30.2079L63.4017 27.2024L46.1216 37.3794L51.4338 40.3848ZM52.7862 39.5884L48.9412 37.413L63.5165 28.829L67.3615 31.0044C70.3717 32.7075 70.6906 34.6519 65.9574 37.4395L63.9039 38.649C59.0955 41.4808 55.7711 41.2772 52.7862 39.5884ZM61.3111 45.9732L62.7024 46.7603L75.2241 39.3857L73.8329 38.5986L61.3111 45.9732ZM76.7614 36.6985L78.4563 37.6574L80.1342 36.6692L78.4393 35.7103L76.7614 36.6985ZM87.7105 46.4501L72.7419 50.3294L79.1604 41.6128L77.6174 40.7397L70.256 51.0339L71.622 51.8068L89.2535 47.3232L87.7105 46.4501ZM103.216 47.7599L92.8479 53.866L99.4654 57.61L101.539 56.3888L97.441 54.0702L99.6949 52.7428L103.338 54.8037L105.411 53.5825L101.769 51.5216L103.662 50.4065L107.76 52.7251L109.833 51.5038L103.216 47.7599ZM110.827 52.0661L108.754 53.2874L111.486 54.833L103.191 59.718L105.711 61.1434L114.005 56.2585L116.737 57.8042L118.811 56.5829L110.827 52.0661ZM110.975 64.1219L113.295 63.3868L116.528 65.2159L115.316 66.5778L118.002 68.0978L124.728 59.9307L122.299 58.5568L108.289 62.602L110.975 64.1219ZM120.058 61.2791L117.948 63.6254L116.021 62.5348L120.058 61.2791Z"
        className="fill-MaxDiv"
        transform="translate(372,30)"
        fill={fillColor(pairColor('MaxDiv', etaPairing), strokeColor)}
        fillRule="evenodd"
        visibility={showStrategies}
        cursor="pointer"
        pointerEvents="all"
        onClick={handleSelect('MaxDiv')}
      />
      <path
        d="M323.114 1.7843L303.402 13.1705L529.829 143.891L549.087 132.816"
        className="fill-MaxDiv"
        stroke={fillColor(pairColor('MaxDiv', etaPairing), strokeColor)}
        strokeWidth="2"
        visibility={showStrategies}
      />
      {/* DivGuard */}
      <path
        d="M393.038 563.692C396.985 561.459 397.713 558.704 392.229 555.474L389.975 554.147C384.465 550.902 379.705 551.282 375.758 553.515L369.561 557.021L386.841 567.198L393.038 563.692ZM390.083 561.951L387.427 563.454L376.083 556.773L378.739 555.27C381.091 553.939 383.453 554.395 386.433 556.15L388.687 557.478C391.668 559.233 392.436 560.62 390.083 561.951ZM402.6 558.282L405.838 556.45L393.316 549.075L390.079 550.907L402.6 558.282ZM388.299 550.005L391.79 548.03L388.685 546.201L385.194 548.176L388.299 550.005ZM404.163 542.939L409.469 549.306L398.522 546.13L394.98 548.134L412.409 552.732L415.445 551.015L407.729 540.921L404.163 542.939ZM419.474 538.99L420.826 539.786L425.556 537.11C429.637 539.689 429.544 541.649 426.635 543.295C423.676 544.97 420.202 544.969 415.494 542.196L413.44 540.986C408.732 538.214 408.8 536.209 411.76 534.534C414.188 533.16 417.06 532.866 420.497 534.247L421.938 533.431C417.6 531.519 413.493 531.992 410.407 533.738C406.613 535.885 406.388 538.527 411.973 541.816L414.027 543.026C419.611 546.315 424.193 546.239 427.988 544.092C431.883 541.888 431.907 539.127 426.398 535.882L425.696 535.469L419.474 538.99ZM434.528 525.759L433.137 526.546L440.65 530.971C442.929 532.313 443.318 533.915 440.915 535.274C438.967 536.376 436.398 536.528 433.568 534.862L426.155 530.496L424.764 531.283L432.177 535.649C435.733 537.743 439.257 537.716 442.065 536.127C443.963 535.054 444.475 534.012 443.981 532.932L445.659 533.92L447.05 533.133L434.528 525.759ZM446.387 529.373C448.791 530.789 451.712 530.669 454.52 529.08C456.139 528.164 457.028 527.228 456.409 526.045L457.962 526.96L459.353 526.172L450.688 521.069C447.633 519.27 445.214 519.539 442.128 521.285C439.877 522.559 439.138 523.585 439.73 524.956L441.519 524.782C441.001 523.543 441.887 522.925 443.405 522.067C445.732 520.75 447.168 520.603 449.297 521.856L450.85 522.771L447.156 524.86C444.551 526.334 443.983 527.957 446.387 529.373ZM453.304 524.216C456.109 525.868 455.267 527.154 453.218 528.313C451.447 529.315 449.557 529.633 447.804 528.601C446.476 527.819 446.208 526.814 448.384 525.583L452.077 523.494L453.304 524.216ZM455.985 514.949C457.098 514.319 458.283 514.141 459.792 514.27L460.104 513.11C458.168 512.934 456.454 513.18 454.81 514.111C453.216 515.012 452.855 516.026 453.476 517.005L451.773 516.002L450.381 516.79L462.903 524.164L464.294 523.377L456.756 518.937C454.477 517.595 454.012 516.065 455.985 514.949ZM469.813 507.675C467.927 507.383 466.112 507.716 464.215 508.789C461.078 510.564 461.211 512.716 464.767 514.81L466.57 515.872C470.001 517.893 473.749 518.201 477.037 516.341C478.934 515.267 479.623 514.271 479.179 513.192L480.707 514.091L482.098 513.304L464.818 503.127L463.427 503.914L469.813 507.675ZM475.861 515.531C473.408 516.92 470.591 516.634 467.961 515.085L466.158 514.023C463.428 512.415 463.19 510.844 465.593 509.484C468.3 507.953 470.99 508.369 473.544 509.873L475.347 510.935C477.802 512.38 478.694 513.929 475.861 515.531ZM472.109 497.034L482.477 503.14L489.095 499.396L487.021 498.175L482.923 500.493L480.669 499.166L484.312 497.105L482.238 495.884L478.596 497.944L476.702 496.829L480.8 494.511L478.727 493.29L472.109 497.034ZM479.721 492.727L481.794 493.949L484.526 492.403L492.82 497.288L495.34 495.862L487.046 490.977L489.778 489.432L487.704 488.211L479.721 492.727ZM500.604 492.884L499.378 491.53L502.611 489.701L504.945 490.428L507.632 488.908L493.621 484.863L491.193 486.237L497.918 494.404L500.604 492.884ZM495.863 487.585L499.884 488.849L497.957 489.94L495.863 487.585Z"
        className="fill-DivGuard"
        fill={fillColor(pairColor('DivGuard', etaPairing), strokeColor)}
        fillRule="evenodd"
        visibility={showStrategies}
      />
      <path
        d="M323.114 592.271L303.402 580.898L529.829 450.177L549.087 461.252"
        className="fill-DivGuard"
        stroke={fillColor(pairColor('DivGuard', etaPairing), strokeColor)}
        strokeWidth="2"
        visibility={showStrategies}
      />
      {/* GrowthGuard */}
      <path
        d="M61.5671 478.54L58.5969 480.255L61.5166 481.941C59.226 483.03 57.1872 483.277 55.1987 482.129C53.16 480.952 53.4621 479.528 56.7847 477.61L59.2515 476.186C62.5741 474.268 65.0408 474.094 67.0796 475.271C68.8415 476.288 68.7156 477.436 67.4318 478.526L70.8046 480.473C73.8252 478.12 73.6995 475.664 70.0498 473.557C66.1484 471.304 61.0891 471.057 55.4759 474.297L53.2608 475.576C47.9497 478.642 48.3272 481.592 52.2285 483.844C56.1551 486.111 60.9879 486.169 66.299 483.103L67.8848 482.188L61.5671 478.54ZM81.4592 487.933C82.013 486.741 81.5348 485.709 80.0246 484.838C78.5396 483.98 77.0545 483.878 75.9973 483.995L77.0545 483.384L73.9083 481.568L61.3226 488.833L64.5444 490.693L71.9448 486.421C73.7068 485.404 75.3932 485.36 76.6014 486.058C77.4068 486.523 77.3816 487.061 77.2306 487.526L81.4592 487.933ZM88.9678 496.627C92.7435 494.448 92.7688 492.195 89.2701 490.175C85.8218 488.185 81.87 488.17 78.0943 490.349L76.5841 491.221C73.0601 493.255 72.5818 495.595 76.2314 497.702C80.0321 499.896 84.0091 499.49 87.4576 497.499L88.9678 496.627ZM78.9499 496.133C77.1628 495.101 78.069 494.055 79.8814 493.009L81.1903 492.253C83.204 491.091 84.9659 490.829 86.5516 491.745C88.1374 492.66 87.6842 493.677 85.6705 494.84L84.3616 495.595C82.5493 496.642 80.7118 497.15 78.9499 496.133ZM99.4685 501.76L94.4342 507.95L97.0267 509.447L113.111 504.202L109.763 502.269L100.752 505.407L105.258 499.668L102.892 498.302L93.1507 500.989L98.5626 495.802L95.2402 493.884L86.128 503.154L88.7457 504.666L99.4685 501.76ZM110.816 506.015L112.427 506.945L106.663 510.273C103.415 512.147 103.818 513.368 106.864 515.126L108.223 515.911L111.042 514.283L110.01 513.688C108.827 513.005 109.104 512.554 110.363 511.828L115.623 508.791L118.09 510.215L120.809 508.646L118.342 507.222L121.111 505.623L117.914 503.778L115.145 505.376L113.534 504.446L110.816 506.015ZM110.213 517.06L113.434 518.92L120.835 514.648C122.496 513.689 124.208 513.544 125.693 514.401C127.002 515.157 127.002 515.97 125.038 517.104L117.663 521.361L120.86 523.207L128.738 518.659C132.464 516.508 131.608 514.619 129.066 513.151C127.606 512.309 126.146 512.134 125.038 512.221L130.803 508.894L127.581 507.034L110.213 517.06ZM138.287 523.474L136.928 524.259L141.635 526.976C137.23 529.345 133.832 529.301 130.937 527.63C127.992 525.93 127.942 523.924 132.674 521.193L134.738 520.001C139.47 517.269 142.944 517.299 145.889 518.999C148.305 520.394 148.859 522.051 146.518 524.041L147.953 524.87C151.2 522.356 150.319 519.987 147.248 518.214C143.472 516.034 138.891 515.918 133.278 519.158L131.214 520.35C125.601 523.59 125.802 526.235 129.578 528.414C133.454 530.652 138.236 530.652 143.774 527.456L144.479 527.049L138.287 523.474ZM161.432 532.099L160.047 531.3L152.496 535.659C150.205 536.981 147.436 537.214 145.045 535.833C143.107 534.714 142.805 533.232 145.65 531.59L153.1 527.289L151.716 526.49L144.265 530.791C140.691 532.854 140.791 534.889 143.585 536.502C145.473 537.592 147.285 537.882 149.148 537.592L147.462 538.565L148.846 539.364L161.432 532.099ZM155.349 538.963C152.933 540.358 153.184 542.044 155.978 543.657C157.589 544.587 159.225 545.095 161.264 544.732L159.704 545.633L161.088 546.432L169.797 541.405C172.868 539.632 172.365 538.237 169.294 536.464C167.054 535.171 165.267 534.75 162.901 535.098L163.228 536.13C165.367 535.825 166.45 536.333 167.96 537.205C170.275 538.542 170.552 539.371 168.413 540.606L166.852 541.507L163.177 539.385C160.585 537.888 157.766 537.568 155.349 538.963ZM164.385 542.931C161.566 544.558 159.326 544.078 157.287 542.901C155.525 541.884 154.946 540.794 156.708 539.777C158.042 539.007 159.779 538.847 161.944 540.097L165.619 542.219L164.385 542.931ZM180.478 544.433C181.585 545.072 181.912 545.755 181.711 546.627L183.725 546.801C184.001 545.682 183.548 544.694 181.912 543.75C180.327 542.834 178.565 542.631 176.878 542.994L178.59 542.006L177.206 541.207L164.62 548.472L166.004 549.271L173.581 544.897C175.871 543.575 178.514 543.299 180.478 544.433ZM193.285 552.379C193.763 551.289 193.159 550.243 191.271 549.153C188.15 547.351 184.425 547.438 180.85 549.501L179.038 550.547C175.59 552.538 175.111 554.703 178.383 556.592C180.271 557.682 182.008 558.075 183.87 557.813L182.335 558.699L183.719 559.499L201.088 549.473L199.703 548.674L193.285 552.379ZM179.768 555.909C177.326 554.5 177.779 552.872 180.422 551.347L182.235 550.3C184.978 548.717 187.697 548.571 190.088 549.952C192.781 551.507 192.101 553.062 189.534 554.544L187.722 555.59C185.255 557.014 182.587 557.537 179.768 555.909ZM211.752 553.652L201.331 559.667L207.916 563.469L210 562.266L205.922 559.912L208.188 558.604L211.812 560.696L213.896 559.493L210.272 557.401L212.175 556.302L216.252 558.656L218.337 557.453L211.752 553.652ZM219.325 558.024L217.241 559.227L219.96 560.797L211.623 565.609L214.13 567.057L222.467 562.244L225.185 563.814L227.269 562.611L219.325 558.024ZM219.368 570.081L221.694 569.366L224.911 571.223L223.687 572.575L226.36 574.118L233.157 566.01L230.741 564.615L216.695 568.538L219.368 570.081ZM228.475 567.318L226.346 569.645L224.428 568.538L228.475 567.318Z"
        className="fill-GrowthGuard"
        fill={fillColor(pairColor('GrowthGuard', etaPairing), strokeColor)}
        fillRule="evenodd"
        visibility={showStrategies}
      />
      <path
        d="M256.496 592.271L276.208 580.898L49.7812 450.177L30.5232 461.252"
        className="fill-GrowthGuard"
        stroke={fillColor(pairColor('GrowthGuard', etaPairing), strokeColor)}
        strokeWidth="2"
        visibility={showStrategies}
      />
      {/* PureDiv */}
      <path
        d="M560.497 239.468C560.497 244.118 562.822 246.967 567.066 246.967C571.367 246.967 573.489 244.089 573.489 239.468L573.489 232.289L553.435 232.289L553.435 236.358L560.497 236.358L560.497 239.468ZM563.927 236.358L570.03 236.358L570.03 238.887C570.03 241.706 568.984 242.898 567.066 242.898C564.915 242.898 563.927 241.706 563.927 238.887L563.927 236.358ZM567.967 261.233L567.967 257.541L559.422 257.541C557.417 257.541 556.37 256.728 556.37 255.013C556.37 253.472 557.155 252.659 559.451 252.659L567.967 252.659L567.967 248.939L558.899 248.939C554.626 248.939 553.173 251.351 553.173 254.286C553.173 256.205 553.667 256.989 554.656 257.6L553.435 257.6L553.435 261.233L567.967 261.233ZM565.961 274.961C567.473 274.09 568.228 272.782 568.228 271.038C568.228 269.323 567.473 268.364 566.746 267.87L567.967 267.87L567.967 264.237L553.435 264.237L553.435 267.957L561.98 267.957C564.014 267.957 565.031 268.887 565.031 270.282C565.031 271.212 564.479 271.735 563.927 272.113L565.961 274.961ZM557.562 284.446C556.777 283.893 556.312 283.399 556.312 281.859C556.312 279.795 557.765 279.156 559.771 279.127L559.771 287.41L561.427 287.41C565.845 287.41 568.228 285.521 568.228 281.423C568.228 277.645 566.107 275.436 561.718 275.436L559.742 275.436C555.992 275.436 553.173 277.528 553.173 281.888C553.173 284.504 553.871 286.189 555.644 287.207L557.562 284.446ZM565.089 281.452C565.089 282.847 564.305 283.603 562.416 283.69L562.416 279.127C564.072 279.272 565.089 279.97 565.089 281.452ZM553.435 297.33C553.435 301.777 555.789 304.596 562.27 304.596L564.654 304.596C571.135 304.596 573.489 301.777 573.489 297.33L573.489 291.227L553.435 291.227L553.435 297.33ZM555.004 297.33L555.004 292.913L571.92 292.913L571.92 297.33C571.92 300.789 570.147 302.911 564.654 302.911L562.27 302.911C556.69 302.911 555.004 300.76 555.004 297.33ZM553.435 308.679L553.435 310.278L567.967 310.278L567.967 308.679L553.435 308.679ZM571.542 308.505L571.542 310.452L573.489 310.452L573.489 308.505L571.542 308.505ZM567.967 324.624L555.556 319.712L567.967 314.8L567.967 313.027L553.435 318.956L553.435 320.526L567.967 326.397L567.967 324.624ZM575.467 335.013L563.435 335.013L563.435 342.616L565.841 342.616L565.841 337.908L568.457 337.908L568.457 342.093L570.864 342.093L570.864 337.908L573.061 337.908L573.061 342.616L575.467 342.616L575.467 335.013ZM575.467 343.758L573.061 343.758L573.061 346.897L563.435 346.897L563.435 349.792L573.061 349.792L573.061 352.931L575.467 352.931L575.467 343.758ZM563.435 355.841L565.493 356.469L565.493 360.183L563.435 360.828L563.435 363.915L575.467 359.73L575.467 356.939L563.435 352.754L563.435 355.841ZM571.456 358.334L567.899 359.433L567.899 357.218L571.456 358.334Z"
        className="fill-PureDiv"
        fill={fillColor(pairColor('PureDiv', etaPairing), strokeColor)}
        fillRule="evenodd"
        visibility={showStrategies}
      />
      <path
        d="M562.159 166.301H542.46V427.755H562.159"
        className="fill-PureDiv"
        stroke={fillColor(pairColor('PureDiv', etaPairing), strokeColor)}
        strokeWidth="2"
        visibility={showStrategies}
      />
      {/* Pure Growth */}
      <path
        d="M21.4699 379.394C21.4699 374.744 19.1448 371.895 14.9015 371.895C10.6 371.895 8.47832 374.773 8.47832 379.394L8.47832 386.573L28.5325 386.573L28.5325 382.504L21.4699 382.504L21.4699 379.394ZM18.0404 382.504L11.9369 382.504L11.9369 379.975C11.9369 377.156 12.9832 375.964 14.9015 375.964C17.0522 375.964 18.0404 377.156 18.0404 379.975L18.0404 382.504ZM14.0005 357.629L14.0005 361.321L22.5453 361.321C24.5507 361.321 25.597 362.134 25.597 363.849C25.597 365.389 24.8123 366.203 22.5162 366.203L14.0005 366.203L14.0005 369.923L23.0684 369.923C27.3408 369.923 28.794 367.511 28.794 364.576C28.794 362.657 28.3 361.873 27.3118 361.262L28.5325 361.262L28.5325 357.629L14.0005 357.629ZM16.0059 343.901C14.4946 344.772 13.7389 346.08 13.7389 347.824C13.7389 349.539 14.4946 350.498 15.2212 350.992L14.0005 350.992L14.0005 354.625L28.5325 354.625L28.5325 350.905L19.9877 350.905C17.9532 350.905 16.9359 349.975 16.9359 348.58C16.9359 347.65 17.4882 347.127 18.0404 346.749L16.0059 343.901ZM24.4054 334.416C25.1901 334.969 25.6551 335.463 25.6551 337.003C25.6551 339.067 24.2019 339.706 22.1965 339.735L22.1965 331.452L20.5399 331.452C16.1221 331.452 13.7389 333.341 13.7389 337.439C13.7389 341.217 15.8606 343.426 20.2492 343.426L22.2256 343.426C25.9748 343.426 28.794 341.334 28.794 336.974C28.794 334.358 28.0965 332.673 26.3236 331.655L24.4054 334.416ZM16.8778 337.41C16.8778 336.015 17.6625 335.259 19.5517 335.172L19.5517 339.735C17.895 339.59 16.8778 338.892 16.8778 337.41ZM18.7379 321.444L20.3074 321.444L20.3074 316.009C25.2192 316.184 27.1374 318.189 27.1374 321.531C27.1374 324.932 25.161 326.966 19.697 326.966L17.3138 326.966C11.8497 326.966 9.87339 324.932 9.87339 321.531C9.87339 318.741 11.2103 316.765 14.5527 316.126L14.5527 314.469C10.164 315.108 8.30393 317.986 8.30393 321.531C8.30393 325.891 10.8325 328.652 17.3138 328.652L19.697 328.652C26.1783 328.652 28.7069 325.891 28.7068 321.531C28.7068 317.056 25.9458 314.295 19.5517 314.295L18.7379 314.295L18.7379 321.444ZM15.3374 305.56C15.3374 304.282 15.8315 303.41 16.8197 302.654L15.8315 301.317C14.5527 302.276 13.8261 303.526 13.8261 305.415C13.8261 307.246 14.6399 308.467 15.9768 309.077L14.0005 309.077L14.0005 310.676L28.5325 310.676L28.5325 309.077L19.7842 309.077C17.1394 309.077 15.3374 307.827 15.3374 305.56ZM22.3128 288.476L20.1911 288.476C16.064 288.476 13.8261 290.656 13.8261 294.376C13.8261 298.096 16.064 300.276 20.1911 300.276L22.3128 300.276C26.3817 300.276 28.7068 298.125 28.7068 294.376C28.7068 290.482 26.2655 288.476 22.3128 288.476ZM22.3128 290.075C25.3645 290.075 27.2246 291.557 27.2246 294.376C27.2246 297.312 25.3645 298.678 22.3128 298.678L20.1911 298.678C17.0231 298.678 15.3084 297.166 15.3084 294.376C15.3084 291.615 17.0231 290.075 20.1911 290.075L22.3128 290.075ZM28.5325 272.721L28.5325 271.297L14.0005 267.082L14.0005 268.768L25.6261 272.11L14.0005 276.354L14.0005 277.72L25.597 281.876L14.0005 285.189L14.0005 286.875L28.5325 282.661L28.5325 281.237L16.5581 276.993L28.5325 272.721ZM15.4827 266.031L15.4827 264.171L24.0566 264.171C27.0793 264.171 28.5325 263.241 28.5325 260.015L28.5325 258.998L26.9921 258.998L26.9921 259.957C26.9921 262.311 25.9458 262.572 23.6207 262.572L15.4827 262.572L15.4827 258.998L14.0005 258.998L14.0005 262.572L10.8034 262.572L10.8034 264.171L14.0005 264.171L14.0005 266.031L15.4827 266.031ZM28.5325 255.812L28.5325 254.213L19.8133 254.213C17.1394 254.213 15.3374 252.847 15.3374 250.115C15.3374 247.848 16.6453 246.192 19.9586 246.192L28.5325 246.192L28.5325 244.593L19.9295 244.593C15.8315 244.593 13.8261 246.715 13.8261 249.941C13.8261 252.091 14.5818 253.428 15.9768 254.213L8.47831 254.213L8.47831 255.812L28.5325 255.812ZM6.49997 234.236L18.5325 234.236L18.5325 226.632L16.126 226.632L16.126 231.341L13.5102 231.341L13.5102 227.156L11.1037 227.156L11.1037 231.341L8.90647 231.341L8.90647 226.632L6.49997 226.632L6.49997 234.236ZM6.49997 225.49L8.90647 225.49L8.90647 222.352L18.5325 222.352L18.5325 219.457L8.90647 219.457L8.90647 216.318L6.49997 216.318L6.49997 225.49ZM18.5325 213.408L16.4747 212.78L16.4747 209.066L18.5325 208.421L18.5325 205.334L6.49997 209.519L6.49997 212.309L18.5325 216.495L18.5325 213.408ZM10.5108 210.914L14.0682 209.816L14.0682 212.03L10.5108 210.914Z"
        className="fill-PureGrowth"
        fill={fillColor(pairColor('PureGrowth', etaPairing), strokeColor)}
        fillRule="evenodd"
        visibility={showStrategies}
      />
      <path
        d="M17.4509 427.755H37.1628V166.301H17.4509"
        className="fill-PureGrowth"
        stroke={fillColor(pairColor('PureGrowth', etaPairing), strokeColor)}
        strokeWidth="2"
        visibility={showStrategies}
      />

      {/* Outer Cube */}
      <g filter="url(#filter0_ddiiii_471_465)">
        <path
          d="M289.805 21.7235L528.225 159.376V434.68L289.805 572.332L51.3845 434.68V159.376L289.805 21.7235Z"
          fill="#F5F5F5"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddiiii_471_465"
          x="36.3845"
          y="6.72351"
          width="506.841"
          height="580.608"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_471_465"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_471_465"
            result="effect2_dropShadow_471_465"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_471_465"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="15" dy="15" />
          <feGaussianBlur stdDeviation="19" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0.9 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect3_innerShadow_471_465"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-15" dy="-15" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_471_465"
            result="effect4_innerShadow_471_465"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="15" dy="-15" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_471_465"
            result="effect5_innerShadow_471_465"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-15" dy="15" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0 0.760784 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect5_innerShadow_471_465"
            result="effect6_innerShadow_471_465"
          />
        </filter>
      </defs>

      <path transform="translate(175, 260)"
          d="M41.0695 0.712376V28.3124H56.9095V27.1124H42.2695V14.6324H55.7095V13.4324H42.2695V1.91238H56.9095V0.712376H41.0695ZM88.7054 16.3524V12.6724C88.7054 4.19238 84.8254 0.472376 79.1054 0.472376C73.3854 0.472376 69.5054 4.19238 69.5054 12.6724V16.3524C69.5054 24.8724 73.3854 28.5524 79.1054 28.5524C82.0654 28.5524 84.5454 27.5524 86.2254 25.3924L89.7854 28.7124L90.5454 27.9124L86.8654 24.4724C88.0254 22.5124 88.7054 19.8324 88.7054 16.3524ZM70.7054 12.6724C70.7054 4.59238 74.3054 1.67238 79.1054 1.67238C83.9054 1.67238 87.5054 4.59238 87.5054 12.6724V16.3524C87.5054 19.5124 86.9454 21.8724 85.9854 23.5924L80.8654 18.7124L80.0254 19.5924L85.3454 24.5924C83.8254 26.5524 81.6254 27.3524 79.1054 27.3524C74.3054 27.3524 70.7054 24.4324 70.7054 16.3524V12.6724ZM112.49 28.5524C118.37 28.5524 122.09 25.1524 122.09 17.0324V0.712376H120.89V17.0324C120.89 23.7524 117.93 27.3524 112.49 27.3524C107.05 27.3524 104.09 23.7524 104.09 17.0324V0.712376H102.89V17.0324C102.89 25.1524 106.61 28.5524 112.49 28.5524ZM139.287 0.712376H138.087V28.3124H139.287V0.712376ZM152.096 0.712376V1.91238H161.216V28.3124H162.416V1.91238H171.536V0.712376H152.096ZM180.521 0.712376L189.841 15.9524V28.3124H191.041V15.9524L200.361 0.712376H198.961L190.441 14.6324L181.921 0.712376H180.521ZM19.7757 67.3524V63.6724C19.7757 55.1924 15.8957 51.4724 10.1757 51.4724C4.45571 51.4724 0.575705 55.1924 0.575705 63.6724V67.3524C0.575705 75.8724 4.45571 79.5524 10.1757 79.5524C15.8957 79.5524 19.7757 75.8724 19.7757 67.3524ZM1.77571 63.6724C1.77571 55.5924 5.37571 52.6724 10.1757 52.6724C14.9757 52.6724 18.5757 55.5924 18.5757 63.6724V67.3524C18.5757 75.4324 14.9757 78.3524 10.1757 78.3524C5.37571 78.3524 1.77571 75.4324 1.77571 67.3524V63.6724ZM41.9601 67.9924C48.3601 67.9924 52.0001 64.9524 52.0001 59.8724C52.0001 54.7524 48.3201 51.7124 41.9601 51.7124H33.9601V79.3124H35.1601V67.9924H41.9601ZM35.1601 66.7924V52.9124H41.9601C47.9201 52.9124 50.8001 55.4724 50.8001 59.8724C50.8001 64.2324 47.9201 66.7924 41.9601 66.7924H35.1601ZM61.807 51.7124V52.9124H70.927V79.3124H72.127V52.9124H81.247V51.7124H61.807ZM95.232 51.7124H94.032V79.3124H95.232V51.7124ZM112.361 51.7124H111.241V79.3124H112.441V54.4724L121.921 72.7524H123.041L132.521 54.4724V79.3124H133.721V51.7124H132.601L122.481 71.2324L112.361 51.7124ZM150.919 51.7124H149.719V79.3124H150.919V51.7124ZM183.169 55.9924C181.289 52.9524 178.649 51.4724 174.449 51.4724C168.409 51.4724 165.929 54.5124 165.929 58.2724C165.929 63.3524 169.649 64.8724 174.769 66.0724C179.969 67.2724 182.449 68.7524 182.449 72.8324C182.449 75.8324 180.089 78.3524 174.769 78.3524C170.129 78.3524 167.889 76.5124 166.289 74.3524L165.329 75.0324C167.329 78.0324 170.489 79.5524 174.769 79.5524C181.089 79.5524 183.649 76.2724 183.649 72.8324C183.649 67.5524 180.049 66.1924 174.969 64.8724C171.009 63.8324 167.129 62.9524 167.129 58.2724C167.129 54.3924 170.049 52.6724 174.409 52.6724C178.529 52.6724 180.769 54.3524 182.169 56.6724L183.169 55.9924ZM197.663 51.7124V79.3124H213.503V78.1124H198.863V65.6324H212.303V64.4324H198.863V52.9124H213.503V51.7124H197.663ZM246.259 79.3124L239.619 67.1124C243.419 66.1524 245.539 63.5924 245.539 59.6324C245.539 54.4724 242.019 51.7124 235.899 51.7124H227.499V79.3124H228.699V67.5124H235.899C236.779 67.5124 237.619 67.4724 238.379 67.3524L244.899 79.3124H246.259ZM228.699 66.3124V52.9124H235.899C240.939 52.9124 244.339 54.8324 244.339 59.6324C244.339 64.4724 240.939 66.3124 235.899 66.3124H228.699Z"
          fill="#A49E99"
        visibility={!hideCube || hideMessage ? 'hidden' : 'visible'}
      />

      {/* MaxGrowth Button */}
      <rect
        width="272"
        height="55"
        x="2"
        y="48"
        style={{ fill: 'rgb(0, 0, 255, 0)', cursor: 'pointer' }}
        transform="rotate(-30 50 100) translate(-36 45.5) skewX(30)"
        visibility={showStrategies}
        onClick={handleSelect('MaxGrowth')}
      />
      {/* MaxDiv Button */}
      <rect
        width="272"
        height="55"
        x="115"
        y="-198"
        style={{ fill: 'rgb(0, 0, 255, 0)', cursor: 'pointer' }}
        transform="rotate(30 10 100) translate(10 30) skewX(-32)"
        visibility={showStrategies}
        onClick={handleSelect('MaxDiv')}
      />
      {/* PureDiv Button */}
      <rect
        width="272"
        height="60"
        x="160"
        y="-592"
        style={{ fill: 'rgb(0, 255, 255, 0)', cursor: 'pointer' }}
        transform="rotate(90)"
        visibility={showStrategies}
        onClick={handleSelect('PureDiv')}
      />
      {/* PureGrowth Button */}
      <rect
        width="272"
        height="60"
        x="160"
        y="-45"
        style={{ fill: 'rgb(0, 255, 255, 0)', cursor: 'pointer' }}
        transform="rotate(90)"
        visibility={showStrategies}
        onClick={handleSelect('PureGrowth')}
      />
      {/* DivGuard Button */}
      <rect
        width="272"
        height="55"
        x="-280"
        y="590"
        style={{ fill: 'rgb(0, 0, 255, 0)', cursor: 'pointer' }}
        transform="rotate(-30 50 100) translate(-36 45.5) skewX(30)"
        visibility={showStrategies}
        onClick={handleSelect('DivGuard')}
      />
      {/* GrowthGuard Button */}
      <rect
        width="272"
        height="55"
        x="420"
        y="345"
        style={{ fill: 'rgb(0, 0, 255, 0)', cursor: 'pointer' }}
        transform="rotate(30 10 100) translate(10 30) skewX(-32)"
        visibility={showStrategies}
        onClick={handleSelect('GrowthGuard')}
      />
    </svg>
  );
};

export default EquityBoxView;
