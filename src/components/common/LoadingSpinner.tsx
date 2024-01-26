import clsx from 'clsx';

interface LoadingSpinnerType {
  boxSize: number;
  ballSize: number;
  interval?: number;
  color?: string;
}

/**
 * 로딩 스피너 컴포넌트 입니다.
 * props로 boxSize, ballSize, interval를 입력합니다.
 * boxSize는 로딩스피너 전체사이즈, ballSize는 로딩시 돌아가는 공 하나하나를 의미합니다.
 * interval은 공과 공사이의 간격 입니다. (interval은 입력하지 않으면 기본값 1로 설정됩니다. )
 * color는 회전하는 공의 색깔입니다. 색상코드(16진법)으로 입력하면 됩니다.(e.g color={f00})
 * color의 기본값은 fff(white)입니다.
 * 필수입력 : boxSize, ballSize, 선택 입력 = interval, color
 * 타입 : boxSize, ballSize, interval = number , color = string
 * 크기는 rem 단위 입니다.
 */
const LoadingSpinner = ({ boxSize, ballSize, interval, color = '#fff' }: LoadingSpinnerType) => {
  return (
    <>
      <div className={'busy-loader'}>
        <div className={clsx('w-ball-wrapper', 'ball-1')}>
          <div className={'w-ball'}></div>
        </div>
        <div className={clsx('w-ball-wrapper', 'ball-2')}>
          <div className={'w-ball'}></div>
        </div>
        <div className={clsx('w-ball-wrapper', 'ball-3')}>
          <div className={'w-ball'}></div>
        </div>
        <div className={clsx('w-ball-wrapper', 'ball-4')}>
          <div className={'w-ball'}></div>
        </div>
        <div className={clsx('w-ball-wrapper', 'ball-5')}>
          <div className={'w-ball'}></div>
        </div>
      </div>
      <style jsx>{`
        .busy-loader {
          position: relative;
          width: ${boxSize + 0.4}rem;
          height: ${boxSize + 0.4}rem;
        }
        .w-ball-wrapper {
          position: absolute;
          opacity: 0;
          width: ${boxSize}rem;
          height: ${boxSize}rem;
          -moz-transform: rotate(225deg);
          -moz-animation: orbit ${4.4}s infinite;
          -webkit-transform: rotate(225deg);
          -webkit-animation: orbit ${4.4}s infinite;
          -ms-transform: rotate(225deg);
          -ms-animation: orbit ${4.4}s infinite;
          -o-transform: rotate(225deg);
          -o-animation: orbit ${4.4}s infinite;
          transform: rotate(225deg);
          animation: orbit ${4.4}s infinite;
        }
        .w-ball {
          width: ${ballSize}rem;
          height: ${ballSize}rem;
          position: absolute;
          background: ${color};
          left: 0px;
          top: 0px;
          -moz-border-radius: 1.1rem;
          -webkit-border-radius: 1.1rem;
          -ms-border-radius: 1.1rem;
          -o-border-radius: 1.1rem;
          border-radius: 1.1rem;
        }

        .ball-1 {
          -moz-animation-delay: ${interval ? 0.96 * interval : 0.96}s;
          -webkit-animation-delay: ${interval ? 0.96 * interval : 0.96}s;
          -ms-animation-delay: ${interval ? 0.96 * interval : 0.96}s;
          -o-animation-delay: ${interval ? 0.96 * interval : 0.96}s;
          animation-delay: ${interval ? 0.96 * interval : 0.96}s;
        }

        .ball-2 {
          -moz-animation-delay: ${interval ? 0.19 * interval : 0.19}s;
          -webkit-animation-delay: ${interval ? 0.19 * interval : 0.19}s;
          -ms-animation-delay: ${interval ? 0.19 * interval : 0.19}s;
          -o-animation-delay: ${interval ? 0.19 * interval : 0.19}s;
          animation-delay: ${interval ? 0.19 * interval : 0.19}s;
        }

        .ball-3 {
          -moz-animation-delay: ${interval ? 0.38 * interval : 0.38}s;
          -webkit-animation-delay: ${interval ? 0.38 * interval : 0.38}s;
          -ms-animation-delay: ${interval ? 0.38 * interval : 0.38}s;
          -o-animation-delay: ${interval ? 0.38 * interval : 0.38}s;
          animation-delay: ${interval ? 0.38 * interval : 0.38}s;
        }

        .ball-4 {
          -moz-animation-delay: ${interval ? 0.58 * interval : 0.58}s;
          -webkit-animation-delay: ${interval ? 0.58 * interval : 0.58}s;
          -ms-animation-delay: ${interval ? 0.58 * interval : 0.58}s;
          -o-animation-delay: ${interval ? 0.58 * interval : 0.58}s;
          animation-delay: ${interval ? 0.58 * interval : 0.58}s;
        }

        .ball-5 {
          -moz-animation-delay: ${interval ? 0.77 * interval : 0.77}s;
          -webkit-animation-delay: ${interval ? 0.77 * interval : 0.77}s;
          -ms-animation-delay: ${interval ? 0.77 * interval : 0.77}s;
          -o-animation-delay: ${interval ? 0.77 * interval : 0.77}s;
          animation-delay: ${interval ? 0.77 * interval : 0.77}s;
        }

        @-moz-keyframes orbit {
          0% {
            opacity: 1;
            z-index: 99;
            -moz-transform: rotate(180deg);
            -moz-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -moz-transform: rotate(300deg);
            -moz-animation-timing-function: linear;
            -moz-origin: 0%;
          }

          30% {
            opacity: 1;
            -moz-transform: rotate(410deg);
            -moz-animation-timing-function: ease-in-out;
            -moz-origin: 7%;
          }

          39% {
            opacity: 1;
            -moz-transform: rotate(645deg);
            -moz-animation-timing-function: linear;
            -moz-origin: 30%;
          }

          70% {
            opacity: 1;
            -moz-transform: rotate(770deg);
            -moz-animation-timing-function: ease-out;
            -moz-origin: 39%;
          }

          75% {
            opacity: 1;
            -moz-transform: rotate(900deg);
            -moz-animation-timing-function: ease-out;
            -moz-origin: 70%;
          }

          76% {
            opacity: 0;
            -moz-transform: rotate(900deg);
          }

          100% {
            opacity: 0;
            -moz-transform: rotate(900deg);
          }
        }

        @-webkit-keyframes orbit {
          0% {
            opacity: 1;
            z-index: 99;
            -webkit-transform: rotate(180deg);
            -webkit-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -webkit-transform: rotate(300deg);
            -webkit-animation-timing-function: linear;
            -webkit-origin: 0%;
          }

          30% {
            opacity: 1;
            -webkit-transform: rotate(410deg);
            -webkit-animation-timing-function: ease-in-out;
            -webkit-origin: 7%;
          }

          39% {
            opacity: 1;
            -webkit-transform: rotate(645deg);
            -webkit-animation-timing-function: linear;
            -webkit-origin: 30%;
          }

          70% {
            opacity: 1;
            -webkit-transform: rotate(770deg);
            -webkit-animation-timing-function: ease-out;
            -webkit-origin: 39%;
          }

          75% {
            opacity: 1;
            -webkit-transform: rotate(900deg);
            -webkit-animation-timing-function: ease-out;
            -webkit-origin: 70%;
          }

          76% {
            opacity: 0;
            -webkit-transform: rotate(900deg);
          }

          100% {
            opacity: 0;
            -webkit-transform: rotate(900deg);
          }
        }

        @-ms-keyframes orbit {
          0% {
            opacity: 1;
            z-index: 99;
            -ms-transform: rotate(180deg);
            -ms-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -ms-transform: rotate(300deg);
            -ms-animation-timing-function: linear;
            -ms-origin: 0%;
          }

          30% {
            opacity: 1;
            -ms-transform: rotate(410deg);
            -ms-animation-timing-function: ease-in-out;
            -ms-origin: 7%;
          }

          39% {
            opacity: 1;
            -ms-transform: rotate(645deg);
            -ms-animation-timing-function: linear;
            -ms-origin: 30%;
          }

          70% {
            opacity: 1;
            -ms-transform: rotate(770deg);
            -ms-animation-timing-function: ease-out;
            -ms-origin: 39%;
          }

          75% {
            opacity: 1;
            -ms-transform: rotate(900deg);
            -ms-animation-timing-function: ease-out;
            -ms-origin: 70%;
          }

          76% {
            opacity: 0;
            -ms-transform: rotate(900deg);
          }

          100% {
            opacity: 0;
            -ms-transform: rotate(900deg);
          }
        }

        @-o-keyframes orbit {
          0% {
            opacity: 1;
            z-index: 99;
            -o-transform: rotate(180deg);
            -o-animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            -o-transform: rotate(300deg);
            -o-animation-timing-function: linear;
            -o-origin: 0%;
          }

          30% {
            opacity: 1;
            -o-transform: rotate(410deg);
            -o-animation-timing-function: ease-in-out;
            -o-origin: 7%;
          }

          39% {
            opacity: 1;
            -o-transform: rotate(645deg);
            -o-animation-timing-function: linear;
            -o-origin: 30%;
          }

          70% {
            opacity: 1;
            -o-transform: rotate(770deg);
            -o-animation-timing-function: ease-out;
            -o-origin: 39%;
          }

          75% {
            opacity: 1;
            -o-transform: rotate(900deg);
            -o-animation-timing-function: ease-out;
            -o-origin: 70%;
          }

          76% {
            opacity: 0;
            -o-transform: rotate(900deg);
          }

          100% {
            opacity: 0;
            -o-transform: rotate(900deg);
          }
        }

        @keyframes orbit {
          0% {
            opacity: 1;
            z-index: 99;
            transform: rotate(180deg);
            animation-timing-function: ease-out;
          }

          7% {
            opacity: 1;
            transform: rotate(300deg);
            animation-timing-function: linear;
            origin: 0%;
          }

          30% {
            opacity: 1;
            transform: rotate(410deg);
            animation-timing-function: ease-in-out;
            origin: 7%;
          }

          39% {
            opacity: 1;
            transform: rotate(645deg);
            animation-timing-function: linear;
            origin: 30%;
          }

          70% {
            opacity: 1;
            transform: rotate(770deg);
            animation-timing-function: ease-out;
            origin: 39%;
          }

          75% {
            opacity: 1;
            transform: rotate(900deg);
            animation-timing-function: ease-out;
            origin: 70%;
          }

          76% {
            opacity: 0;
            transform: rotate(900deg);
          }

          100% {
            opacity: 0;
            transform: rotate(900deg);
          }
        }
      `}</style>
    </>
  );
};
export default LoadingSpinner;
