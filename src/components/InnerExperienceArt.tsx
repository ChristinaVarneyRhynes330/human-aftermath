/**
 * Original course identity artwork. Layered, imperfect linework signals
 * the difference between what we observe and the internal human experience.
 * No stock portrait, diagnosis imagery or depiction of physical injury.
 */
export default function InnerExperienceArt() {
  return (
    <svg
      className="block w-full h-auto drop-shadow-[0_25px_65px_rgba(12,24,38,0.24)]"
      viewBox="0 0 620 710" role="img"
      aria-label="Editorial illustration of a human silhouette surrounded by imperfect layers, representing outward observation and the complexity of invisible internal experience."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="identity-paper" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#253E56" offset="0"/>
          <stop stopColor="#111F31" offset="0.55"/>
          <stop stopColor="#152639" offset="1"/>
        </linearGradient>
        <linearGradient id="human-form" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F5E6E7" offset="0"/>
          <stop stopColor="#EACBD4" offset=".53"/>
          <stop stopColor="#BEA8B5" offset="1"/>
        </linearGradient>
        <radialGradient id="interior-illumination">
          <stop stopColor="#EDAE9D" stopOpacity=".75"/>
          <stop stopColor="#EACBD4" stopOpacity=".27" offset=".48"/>
          <stop stopColor="#EACBD4" stopOpacity="0" offset="1"/>
        </radialGradient>
        <pattern id="identity-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0V34" stroke="#BBD4C5" strokeOpacity=".055" strokeWidth=".6" fill="none"/>
        </pattern>
        <clipPath id="artboard">
          <rect x="8" y="8" width="604" height="694" rx="12"/>
        </clipPath>
      </defs>

      <rect x="8" y="8" width="604" height="694" rx="12" fill="url(#identity-paper)"/>
      <g clipPath="url(#artboard)">
        <rect x="8" y="8" width="604" height="694" fill="url(#identity-grid)"/>
        <path d="M43 77H577 M43 630H577" stroke="#BBD4C5" strokeOpacity=".43" strokeWidth="1"/>
        <path d="M43 77V107 M577 77V107 M43 601V630 M577 601V630" stroke="#BBD4C5" strokeOpacity=".43" strokeWidth="1"/>

        <text x="44" y="54" fill="#EACBD4" fontSize="10" fontFamily="sans-serif" letterSpacing="3.1">HUMANITY STUDIES</text>
        <text x="577" y="54" fill="#BBD4C5" fontSize="10" fontFamily="sans-serif" letterSpacing="2" textAnchor="end">VOL. 01</text>

        <g fill="none" strokeLinecap="round">
          <path d="M313 111C454 94 546 190 535 332S466 583 327 572C169 559 86 462 105 318S178 131 313 111Z" stroke="#BBD4C5" strokeOpacity=".4" strokeWidth="1.4" strokeDasharray="3 9"/>
          <path d="M325 145C445 144 497 226 490 331S441 531 322 527C202 523 141 441 147 331S196 143 325 145Z" stroke="#EACBD4" strokeOpacity=".47" strokeWidth="1.9"/>
          <path d="M321 175C409 162 463 231 463 331S409 502 324 500C226 497 179 425 180 335S229 189 321 175Z" stroke="#EDAE9D" strokeOpacity=".58" strokeWidth="1.2" strokeDasharray="1 7"/>
          <path d="M314 201C383 198 428 251 429 334C430 419 387 472 318 473C250 472 216 419 215 339C214 259 253 209 314 201Z" stroke="#BBD4C5" strokeOpacity=".23" strokeWidth="8"/>
          <path d="M159 278C135 318 137 385 160 418" stroke="#BBD4C5" strokeWidth="3" strokeOpacity=".84"/>
          <path d="M478 270C497 320 499 392 471 425" stroke="#EDAE9D" strokeWidth="3" strokeOpacity=".85"/>
        </g>

        <path d="M170 610C178 546 199 510 257 485C272 478 291 462 291 442V408C270 389 257 363 257 321C257 251 280 224 313 210C353 195 393 209 415 245C429 268 432 297 432 322C432 358 416 391 398 409V444C398 469 421 482 450 493C496 511 522 553 530 610Z"
          fill="url(#human-form)" fillOpacity=".18" stroke="#F6EDF0" strokeOpacity=".78" strokeWidth="1.75"/>
        <path d="M310 408C334 420 367 420 396 407 M292 443C319 467 367 469 397 445" fill="none" stroke="#F6EDF0" strokeOpacity=".25" strokeWidth="1.2"/>

        <ellipse cx="344" cy="356" rx="105" ry="112" fill="url(#interior-illumination)"/>
        <path d="M284 362C292 328 312 315 340 317C376 320 393 348 384 382C376 417 342 430 318 407C301 390 304 363 328 359C348 356 360 375 350 391"
          fill="none" stroke="#EDAE9D" strokeWidth="3.5" strokeLinecap="round" opacity=".96"/>
        <path d="M284 362C278 393 296 432 337 447" fill="none" stroke="#EACBD4" strokeWidth="1" strokeDasharray="5 8"/>
        <circle cx="345" cy="379" r="4" fill="#F9D5C9"/>

        <g fontFamily="sans-serif" fontSize="9.6" letterSpacing="2.4" fontWeight="500">
          <text x="48" y="268" fill="#BBD4C5">VISIBLE</text>
          <path d="M104 265L150 265L186 287" stroke="#BBD4C5" strokeOpacity=".65" fill="none"/>
          <text x="575" y="421" textAnchor="end" fill="#EDAE9D">WITHIN</text>
          <path d="M508 415H464L405 390" stroke="#EDAE9D" strokeOpacity=".65" fill="none"/>
          <text x="48" y="559" fill="#EACBD4">CONTEXT</text>
          <path d="M111 555H171L229 504" stroke="#EACBD4" strokeOpacity=".6" fill="none"/>
        </g>

        <path d="M45 652H575" stroke="#BBD4C5" strokeOpacity=".28"/>
        <text x="45" y="673" fontFamily="sans-serif" fontSize="11" letterSpacing="1.25" fill="#F7F4F4">WHAT YOU SEE IS NOT THE WHOLE STORY.</text>
        <text x="575" y="673" fontFamily="sans-serif" fontSize="10" fill="#BBD4C5" textAnchor="end">01 / 08</text>
      </g>
      <rect x="8" y="8" width="604" height="694" rx="12" stroke="#94A3B8" strokeOpacity=".25" fill="none"/>
    </svg>
  );
}
