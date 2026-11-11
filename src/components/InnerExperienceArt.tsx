/**
 * Original "Layered Understanding" contour artwork, based on the project's
 * editorial brand guide. No literal wound, person, brain or trauma iconography.
 * Imperfect contours connect experience with multiple contextual lenses.
 */
export default function InnerExperienceArt() {
  return (
    <svg className="block w-full h-auto"
      viewBox="0 0 620 710" role="img"
      aria-label="An abstract context map with eight imperfect, partially open contours around a shared experience. Fine lines connect body, memory, development, relationships, environment, culture, meaning and systems. No single lens tells the whole story."
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="fine-grain" width="19" height="19" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="8" r=".42" fill="#C9C1B5" opacity=".15" />
          <circle cx="13" cy="16" r=".3" fill="#F4F0E9" opacity=".2" />
        </pattern>
        <clipPath id="paper-window">
          <rect x="7" y="7" width="606" height="696" rx="8"/>
        </clipPath>
      </defs>
      <rect x="7" y="7" width="606" height="696" rx="8" fill="#29433C"/>
      <g clipPath="url(#paper-window)">
        <rect x="7" y="7" width="606" height="696" fill="url(#fine-grain)" />
        <path d="M43 75H576M43 633H576" stroke="#C9C1B5" strokeOpacity=".42" strokeWidth=".8"/>
        <path d="M43 75V102M576 75V102M43 606V633M576 606V633" stroke="#C9C1B5" strokeOpacity=".42" strokeWidth=".8"/>
        <text x="43" y="49" fill="#F4F0E9" fontSize="10" fontFamily="sans-serif" letterSpacing="2.8">THE WOUND CONCEALED</text>
        <text x="577" y="49" fill="#C9C1B5" fontSize="10" fontFamily="sans-serif" letterSpacing="2" textAnchor="end">FIELD NOTE 01</text>

        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M297 100C422 93 529 167 539 283C560 427 483 553 356 567C212 586 93 524 82 375C68 232 146 111 297 100Z"
            stroke="#7D9286" strokeWidth="1.1" strokeOpacity=".9" strokeDasharray="3 8"/>
          <path d="M307 135C421 133 491 208 501 298C514 413 465 512 351 533C219 557 119 470 123 353C116 232 183 141 307 135Z"
            stroke="#F4F0E9" strokeOpacity=".58" strokeWidth="1.35"/>
          <path d="M301 162C404 167 467 225 468 313C480 425 430 481 344 494C232 515 161 454 156 351C153 251 203 162 301 162Z"
            stroke="#C9C1B5" strokeOpacity=".7" strokeWidth="1.1"/>
          <path d="M314 193C402 195 431 249 435 329C434 417 397 454 328 463C251 474 197 415 193 337C187 250 233 192 314 193Z"
            stroke="#7D9286" strokeWidth="1.3" strokeOpacity=".9" strokeDasharray="11 7 2 7"/>
          <path d="M308 220C379 220 402 276 405 333C408 401 372 428 326 434C270 442 222 389 225 334C226 267 260 219 308 220Z"
            stroke="#F4F0E9" strokeOpacity=".67" strokeWidth="1.4"/>
          <path d="M318 250C366 249 380 288 377 336C374 387 358 407 323 406C285 408 257 376 257 334C253 284 276 252 318 250Z"
            stroke="#A86E5D" strokeOpacity=".92" strokeWidth="2.1"/>
          <path d="M321 275C348 275 352 299 350 333C348 367 339 377 318 378C297 377 282 359 281 332C279 301 290 275 321 275Z"
            stroke="#C0A56A" strokeWidth="1.4" strokeOpacity=".93"/>
          <path d="M300 315C309 302 326 296 339 311C352 324 341 346 321 348C306 349 294 338 300 324"
            stroke="#F4F0E9" strokeWidth="1.2" strokeOpacity=".9"/>
        </g>

        <g stroke="#C9C1B5" strokeOpacity=".6" strokeWidth=".9" fill="none">
          <path d="M174 197L137 173H77"/>
          <path d="M439 197L478 169H549"/>
          <path d="M136 344H69"/>
          <path d="M497 345H553"/>
          <path d="M177 482L140 521H70"/>
          <path d="M449 482L484 523H552"/>
          <path d="M226 565L222 593H96"/>
          <path d="M394 568L401 593H528"/>
        </g>
        <g fill="#C0A56A">
          <circle cx="174" cy="197" r="3"/><circle cx="439" cy="197" r="3"/>
          <circle cx="136" cy="344" r="3"/><circle cx="497" cy="345" r="3"/>
          <circle cx="177" cy="482" r="3"/><circle cx="449" cy="482" r="3"/>
          <circle cx="226" cy="565" r="3"/><circle cx="394" cy="568" r="3"/>
        </g>
        <g fill="#F4F0E9" fontFamily="sans-serif" fontSize="9" letterSpacing="1.7">
          <text x="77" y="163">BODY</text>
          <text x="549" y="159" textAnchor="end">MEMORY</text>
          <text x="68" y="336">DEVELOPMENT</text>
          <text x="552" y="336" textAnchor="end">RELATIONSHIPS</text>
          <text x="70" y="512">ENVIRONMENT</text>
          <text x="552" y="513" textAnchor="end">CULTURE</text>
          <text x="95" y="588">MEANING</text>
          <text x="528" y="588" textAnchor="end">SYSTEMS</text>
        </g>
        <g fill="#F4F0E9" fontFamily="sans-serif" fontSize="11" textAnchor="middle" fontWeight="600" letterSpacing="1.4">
          <text x="316" y="327">THE</text>
          <text x="316" y="343">EXPERIENCE</text>
        </g>

        <path d="M43 657H576" stroke="#C9C1B5" strokeOpacity=".3" strokeWidth=".8"/>
        <text x="44" y="681" fontFamily="sans-serif" fontSize="10.4" letterSpacing="1" fill="#F4F0E9">NO SINGLE LENS TELLS THE WHOLE STORY.</text>
        <text x="574" y="681" fontFamily="sans-serif" fontSize="9" letterSpacing="1" fill="#C0A56A" textAnchor="end">FULL CIRCLE</text>
      </g>
      <rect x="7" y="7" width="606" height="696" rx="8" stroke="#C9C1B5" strokeOpacity=".55" fill="none" strokeWidth="1"/>
    </svg>
  );
}
