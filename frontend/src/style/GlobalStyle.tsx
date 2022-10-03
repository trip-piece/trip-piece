import { Global, css } from "@emotion/react";
import { themes } from "./theme";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          html,
          body,
          div,
          span,
          applet,
          object,
          iframe,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          blockquote,
          pre,
          a,
          abbr,
          acronym,
          address,
          big,
          cite,
          code,
          del,
          dfn,
          em,
          img,
          ins,
          kbd,
          q,
          s,
          samp,
          small,
          strike,
          strong,
          sub,
          sup,
          tt,
          var,
          b,
          u,
          i,
          center,
          dl,
          dt,
          dd,
          menu,
          ol,
          ul,
          li,
          fieldset,
          form,
          label,
          legend,
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
          article,
          aside,
          canvas,
          details,
          embed,
          figure,
          figcaption,
          footer,
          header,
          hgroup,
          main,
          menu,
          nav,
          output,
          ruby,
          section,
          summary,
          time,
          mark,
          audio,
          video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            font-family: "기본글씨체";
          }
          /* HTML5 display-role reset for older browsers */
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          main,
          menu,
          nav,
          section {
            display: block;
            font-family: "기본글씨체";
          }
          *[hidden] {
            display: none;
            font-family: "기본글씨체";
          }
          menu,
          ol,
          ul {
            list-style: none;
            font-family: "기본글씨체";
          }
          blockquote,
          q {
            quotes: none;
            font-family: "기본글씨체";
          }
          blockquote:before,
          blockquote:after,
          q:before,
          q:after {
            content: "";
            content: none;
            font-family: "기본글씨체";
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
            font-family: "기본글씨체";
          }
          * {
            box-sizing: border-box;
            font-family: "기본글씨체";
          }
          #root {
            max-width: 550px;
            min-width: 320px;
            min-height: 100vh;
            margin: 0 auto;
            background-color: ${themes.colors.mainDark};
            overflow-x: hidden;
            font-family: "기본글씨체";
          }
          html,
          body {
            scroll-behavior: smooth;
            min-height: 100%;
            font-family: "기본글씨체";
          }
          body {
            line-height: 1.2;
            color: ${themes.colors.gray900};
            background-color: ${themes.colors.white};
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            font-family: "기본글씨체";
          }
          body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
            scrollbar-width: none; /* Firefox */
            font-family: "기본글씨체";
          }
          a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
            font-family: "기본글씨체";
          }
          button {
            cursor: pointer;
            border: none;
            font-family: "기본글씨체";
          }
          *::-webkit-scrollbar {
            width: 5px;
            font-family: "기본글씨체";
          }
          *::-webkit-scrollbar-track {
            background-color: darkgrey;
            font-family: "기본글씨체";
          }
          *::-webkit-scrollbar-thumb {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            font-family: "기본글씨체";
          }
          * {
            scrollbar-width: thin;
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
              display: none;
            }
            font-family: "기본글씨체";
          }
          //다이어리 글씨체
          @font-face {
            font-family: "강원모두교육체";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "이순신돋움";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YiSunShinDotumM.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "교보손글씨";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "IM혜민체";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "교보손글씨박도연";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/KyoboHandwriting2020A.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }

          //여행조각 글씨체
          @font-face {
            font-family: "기본글씨체";
            font-style: normal;
            font-weight: 400;
            src: url("//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamMedium.woff2")
                format("woff2"),
              url("//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamMedium.woff")
                format("woff");
          }
          @font-face {
            font-family: "기본글씨체";
            font-style: normal;
            font-weight: 700;
            src: url("//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamBold.woff2")
                format("woff2"),
              url("//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamBold.woff")
                format("woff");
          }
          @font-face {
            font-family: "기본글씨체";
            font-style: normal;
            font-weight: 300;
            src: url("//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamLight.woff2")
                format("woff2"),
              url("//cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDreamLight.woff")
                format("woff");
          }
          .lottemartdream * {
            font-family: "기본글씨체", sans-serif;
          }
        }
      `}
    />
  );
}
