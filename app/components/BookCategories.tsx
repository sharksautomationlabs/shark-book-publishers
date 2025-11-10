'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

const imgVector8 = "/images/service-bg-vector.svg";
const imgRealisticSharkOcean2 = "/images/service-mask.svg";

const BookCategoriesHome = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>("Mystery, Thriller\n& Suspense");
  const { videoRef, isInView } = useVideoLazyLoading();

  const categories = [
    {
      name: "Mystery, Thriller\n& Suspense",
      image: "/images/category-mystery.png",
      staggered: false,
      books: [
        { title: "Mystified", image: "/images/mystery/1.jpg", author: "Julia Ash", amazonLink: "https://www.amazon.com/Mystified-Julia-Ash-ebook/dp/B09VZH11GJ?utm_source=chatgpt.com" },
        { title: "Miller Avenue Murder", image: "/images/mystery/2.jpg", author: "Campbell", amazonLink: "https://www.amazon.com/Miller-Avenue-Murder-Campbell/dp/B09HP5F1BY/ref=sr_1_1?crid=SJEQ6PNTI7XY&dib=eyJ2IjoiMSJ9.XrZJfiWGPniPc0KEJhOe9I6hOqsv10TSc4TAcSnaxxEwnxGrTQjss5O2UKuYHAZnv7QOFy9P3R6Ady6P169JsfDmKB-SH5vSzye7j9Uaq70bgn96R-j9WCX-_Kq-8Muwwi-SebDaJHyXRdj9F6tOBeLGwJqBtT2uDHvP-QEqm_5pGl8lqxdF0PvbF2o_g4A8C_8DrocAGD3EsNxvxjdlf8iTMT68J7qsuJWXvpSn0bA.zUmkQ8NOs2umwyePV1H_58kR3is-q16_unJgYWxm-jI&dib_tag=se&keywords=Miller+Avenue+Murder&qid=1759369703&sprefix=miller+avenue+murder%2Caps%2C295&sr=8-1#detailBullets_feature_div" },
        { title: "Phantom Cove", image: "/images/mystery/3.jpg", author: "Port Stirling Mystery", amazonLink: "https://www.amazon.com/Phantom-Cove-Port-Stirling-Mystery/dp/B0BKZF9HBP?utm_source=chatgpt.com" },
        { title: "The Dead Bell", image: "/images/mystery/4.jpg", author: "Reid Winslow", amazonLink: "https://www.amazon.com/Dead-Bell-Reid-Winslow/dp/195501809X/ref=sr_1_1?crid=1E6GPK7M8B9NF&dib=eyJ2IjoiMSJ9.UN6_lI8D-T0lP6aGNj7Jlg.KygVZqZ36Igh0LwyRilT2oR4Pv4L1IkGwpiQf3FHihU&dib_tag=se&keywords=The+Dead+Bell+by+Reid&qid=1759409844&sprefix=the+dead+bell+by+reid%2Caps%2C300&sr=8-1#detailBullets_feature_div" },
        { title: "The First Paper Cut", image: "/images/mystery/5.jpg", author: "Anniversary Die", amazonLink: "https://www.amazon.com/First-Paper-Cut-Anniversary-Die-ebook/dp/B0BY63RWZL/ref=sr_1_1?crid=3LTJ9FX14I0TT&dib=eyJ2IjoiMSJ9.i96AkFdXT1Lx12hWlc1h-W93rm3vVqHx7uoo_mUkC2bGjHj071QN20LucGBJIEps.5wN0-9qmmJqYimm-fVjylLvrgl3zetjT4-Aln3rTN9c&dib_tag=se&keywords=The+First+Paper+Cut&qid=1759413805&s=digital-text&sprefix=the+first+paper+cut%2Cdigital-text%2C491&sr=1-1#detailBullets_feature_div" },
        { title: "The Opening Night Murders", image: "/images/mystery/6.jpg", author: "James Byrnside", amazonLink: "https://www.amazon.com/Opening-Night-Murders-James-Byrnside/dp/1090792751/ref=sr_1_1?crid=1ON1FVTC16IGJ&dib=eyJ2IjoiMSJ9.uabrtmfY6FDFp48-Bki77H9KBOwjA6-QhITDx24Jh-nJ7Z2gnjg1CWF7w4AQgAX1Nb9bvFXcRowwI-7p-_vWs1rIglHciD25qIqLnO69awW8Ol_-3ibtFXL-vIgcuH7mtH2trBvHI4c47cdafSLz4Rsb4RDnNe6rG-8TLn0NWrLp6OBdbZtxlloZrpD5GNeYNZM1NfqlADmerY_ssNbYKC-TBxoN4pGVzwDHGiilIRs.ZpykDFl8pMcc_kNeS7ORhdEJYpbng4HwVG3-UbdqpqM&dib_tag=se&keywords=The+Opening+Night+Murders&qid=1759411954&sprefix=the+opening+night+murders%2Caps%2C533&sr=8-1#detailBullets_feature_div" }
      ]
    },
    {
      name: "Science Fiction\nand Fantasy",
      image: "/images/category-scifi.png",
      staggered: true,
      books: [
        { title: "Galactic Odyssey", image: "/images/science/1.jpg", author: "Dr. Sarah Johnson", amazonLink: "https://www.amazon.com/We-are-Voulhire-Arrival-under-ebook/dp/B07JW4W8QV/ref=sr_1_49?dib=eyJ2IjoiMSJ9.jsxv3v9vGpCwVM3nLPhx-qjU2wm5oT34d42oxalKganLVD6pl4TgEV_IvunBbuUR_ZnOZ_CbV5da0wOwOAWyxTn_pLKiuL0CN8vxHGmzzCfDeWMxdjC3h8EEV1rWDC5II97eR9s9b4BtD154scfgOxj_I0sEhbCTGpdDm3xQ0c8CpRpwiG3_ZEhJPna1Zb1eTh5d7X_lj_7Wu6i2mgTG-OVbNe9ACQPv1XAlfj4odLIi1trxfzeTr0nIjjeT_ZCXro98APs02sAoTFj9qraAJTyxodUtSR7KVioa9wgTHc4.w5YKsc5vgB17Wyr47Edbf9HFF9r1CYa671B2G4lgdHg&dib_tag=se&keywords=Self+Published+Books&qid=1759366529&sr=8-49&xpid=PiBXJ5xoRMOoW" },
        { title: "Quantum Paradox", image: "/images/science/2.jpg", author: "Mike Thompson", amazonLink: "https://www.amazon.com/Thirteenth-Hour-Book-Cruel-Gods/dp/1399900684/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.Q4Ic1NRHmckbODiDzJtxhQ.IuaMcCRUXkry34BuapFlffZyQE0wFaReI5HehRQh894&qid=1759372405&sr=1-1#detailBullets_feature_div" },
        { title: "Time Traveler's Dilemma", image: "/images/science/3.jpg", author: "Dr. Lisa Chen", amazonLink: "https://www.amazon.com/Runelight-Aenigma-Lights-JA-Andrews/dp/1736232630/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.PeiRdvrNCOzg3NTFM6sv2wYmxUmv2T4tUl00KP0xRbA.5_DB2APBl-h900ToQK7uD04XN3YwOPgq8_2pdH6uTyE&qid=1759371991&sr=1-1#detailBullets_feature_div" },
        { title: "Neural Network", image: "/images/science/4.jpg", author: "Dr. James Wilson", amazonLink: "https://www.amazon.com/Oathsworn-Legacy-K-R-Gangi/dp/B0CLPFR5FL/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.39HdIDqaYNxWv2ZBWmGZFooY6qfEbgaMQZwG32fWBSHEgV2NEVXYBn5ZbyYSd-IxZ6c071rMYjTO89Dbt-nsxg.YhglF0bvrqe5o4JD3SlIoiRYdezooJ6sfJckgpTPh1M&qid=1759371850&sr=1-1#detailBullets_feature_div" },
        { title: "Mars Colony", image: "/images/science/5.jpg", author: "Sarah Martinez", amazonLink: "https://www.amazon.com/Dark-Frontier-Adventures-DANGO/dp/B0BW32CTC1/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.ovEyW37CCuN_h0Gulv9wSj1AOiIqNzbceMJ1gOTuYWY.nKqZl5vYrtxBo7Zofry-ub7VP_c9ruDBGgIFJDfcSgw&qid=1759372235&sr=1-1#detailBullets_feature_div" },
        { title: "AI Revolution", image: "/images/science/6.jpg", author: "David Lee", amazonLink: "https://www.amazon.com/Humane-Society-Creatures-Cryptids-Teraglossa/dp/B0CJBMCQVY/ref=sr_1_1?crid=3K65V0VZ3L9AP&dib=eyJ2IjoiMSJ9.92zKoZoFU2F6mBIJwQPagHQIWLfBF6Y2AMLjdrozQMU.cgcaxajXScOgyUYMf-VO_lZaQEkQoRMpMSg2uztUUlc&dib_tag=se&keywords=The+Humane+Society+for+Creatures+%26+Cryptids&qid=1759372090&s=books&sprefix=the+humane+society+for+creatures+%26+cryptids%2Cstripbooks-intl-ship%2C542&sr=1-1#detailBullets_feature_div" }
      ]
    },
    {
      name: "Children",
      image: "/images/category-childrens.png",
      staggered: true,
      books: [
        { title: "The Magic Garden", image: "/images/children/1.jpg", author: "Sarah Johnson", amazonLink: "https://www.amazon.com/Mine-Pride-Prejudice-Variation-Variations/dp/B0FPBGWH33/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.jIqgsrPHJRyaJRkn_eguTu9bDbUoVddmLnV1lb7i1Karte-5eKXCHGRMgZrkQrgseNEwHG0vH_wuFUdICQmJs0JUuKWs9MTU_2FYyaPPjbEurY28tlZfRDFXvG4Q-3doCZU8CcNUFsf-NkqsFEVy8JHNbO3RFOowuLXx52Xqho9CZkmJN0gnowAtt_zZ2wgzvMU-iNjXMqn9XKY1RumguNGhAX3WF6M57KS7YUXjGkI.dIfPKVlxSE75NKBAp7be3BqBjjj0XsdwYiBMwRzgor4&qid=1759417968&sr=1-1" },
        { title: "Adventure Friends", image: "/images/children/2.jpg", author: "Mike Thompson", amazonLink: "https://www.amazon.com/Adonis-time-sleep-illustrated-YourNameBook/dp/B0BPWC39DF/ref=sr_1_1?crid=142JY0DZO4RN9&dib=eyJ2IjoiMSJ9.jK9jYrjFmQ6F1lzsPr7EmQ.p493T9u9RD9FRBOgaRUmK76no-xw5-jSK7--alIi3lw&dib_tag=se&keywords=Adonis%2C+time+to+sleep%21&qid=1759418021&s=books&sprefix=adonis%2C+time+to+sleep+%2Cstripbooks-intl-ship%2C289&sr=1-1#detailBullets_feature_div" },
        { title: "The Brave Little Mouse", image: "/images/children/3.jpg", author: "Lisa Chen", amazonLink: "https://www.amazon.com/Whispers-Wisdom-Inspirational-Christian-Childrens/dp/B0C95J7FVN/ref=sr_1_41?crid=1V60MEGQ10B73&dib=eyJ2IjoiMSJ9.StWz7v6oEpVXMmXfE-V_iSyAwsYEUMZ8Iv7SWJhCAZvNoj0JnWD59Ctfgzfr4l16VeVZsGVMpzUKEpwNJse8TxzBIvT2tcJGs_VgQzjKiIyUpIm5JbWd0yWXjEagU8zB3jI5Ii6caiUlsed1K8DZfYMVVeKXvFK9H33XHbgESjs.XNfplKde1qH8NROxtdlz9Y6hNO0DWTffmA9d07CPFLQ&dib_tag=se&keywords=Children%27s+Books&qid=1759418063&s=books&sprefix=children%27s+books%2Cstripbooks-intl-ship%2C290&sr=1-41&xpid=2A9X9a_hjFhM-#audibleproductdetails_feature_div" },
        { title: "Rainbow Dreams", image: "/images/children/4.jpg", author: "James Wilson", amazonLink: "https://www.amazon.com/Spot-Where-book-about-losing/dp/B09BGKKMPJ/ref=sr_1_1?crid=3CON8Q12OBWSK&dib=eyJ2IjoiMSJ9.-e_MCejFwyaaGCNNJ6OjCzQQB_5Is5yWgvSi_sSfemM.4tt-D1dy0qtH1zhXq8UhSs63rM-u_LGMNOGfLlNvwuM&dib_tag=se&keywords=Spot%21+Where+Are+You%3F+A+book+for+kids+about+losing+a+pet&qid=1759418138&s=books&sprefix=spot+where+are+you+a+book+for+kids+about+losing+a+pe%2Cstripbooks-intl-ship%2C289&sr=1-1#detailBullets_feature_div" },
        { title: "The Flying Elephant", image: "/images/children/5.jpg", author: "Sarah Martinez", amazonLink: "https://www.amazon.com/Blakely-Personalized-Alphabet-About-Childrens/dp/B085R72QLC/ref=sr_1_1?crid=3O0KFV021P0JY&dib=eyJ2IjoiMSJ9.lP3NpdmtCpFlgxNVEUS9u5LMnFU16FUjs_5oKNz27S9jC5JLxWWryERmeVpPWajpV16dfNX3nTcq5BrjJn4Wmd45nN-7bnoDPF-m5X67AF8WdFPkR7t-Cuv7dFcKc_taIvy0CU6zVY9Rk4zM_jgWHQ._Ct3T_b61TWngtF089otuT9Cdd5XYVrsKXFRaSr2_Vg&dib_tag=se&keywords=B+is+for+Blakely&qid=1759418069&s=books&sprefix=b+is+for+blakely%2Cstripbooks-intl-ship%2C458&sr=1-1#detailBullets_feature_div" },
        { title: "Pirate's Treasure", image: "/images/children/6.jpg", author: "David Lee", amazonLink: "https://www.amazon.com/Hijab-Crown-Beautifully-illustrated-childrens/dp/B0F24K2HGX/ref=sr_1_1?crid=2FH7H3AJTF4LM&dib=eyJ2IjoiMSJ9.PiQotO_UxRtrK0w2nedfFL788UpM75hIBEEIxmhxZ5tBATmbsnfvrFAqqLVRnh7ZDq3wlQWwHlgzVm3LyTYkXZ5U9iUFDDx1iPf9qNftfuX-KnQwVkmwRohV01F4xj0YKd6AdTy51ilEaY6yfLrj6uP4R7eeRWcwDcJzZq7VKmw82TglOjZlc-LmPpvd44BxQjUVnVgoUjgcoYNRZ05DJh85dkRtxbAk__J9ItKDdcg._Wo89GEKJsAh3Y-Q4C5F0uJ3OCTq_I7Yd7Rvdak6O4I&dib_tag=se&keywords=My+Hijab+Is+My+Crown&qid=1759418201&s=books&sprefix=spot+where+are+you+a+book+for+kids+about+losing+a+pet%2Cstripbooks-intl-ship%2C273&sr=1-1#detailBullets_feature_div" }
      ]
    },
    {
      name: "Health &\nFitness",
      image: "/images/category-business.png",
      staggered: true,
      books: [
        { title: "Healthy Living Guide", image: "/images/health books/book1.jpg", author: "Dr. Sarah Johnson", amazonLink: "https://www.amazon.com/dp/B0DHQXN3XC/ref=sspa_dk_detail_3?psc=1&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=T3KTHCZAGA9KJR3P5SFJ&pd_rd_wg=T20Ys&pd_rd_w=ygVOY&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pd_rd_r=ccefa02f-b1cf-4021-b48e-21ab8ab79082&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Fitness Fundamentals", image: "/images/health books/book2.jpg", author: "Mike Thompson", amazonLink: "https://www.amazon.com/dp/B0FH7GG4SD/ref=sspa_dk_detail_7?psc=1&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=ZM0GGMZJCXAN45R9M8ZT&pd_rd_wg=a7oj9&pd_rd_w=3o79P&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pd_rd_r=fdf14a9f-7463-4929-8f78-11f19f14eb91&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Nutrition Essentials", image: "/images/health books/book3.jpg", author: "Dr. Lisa Chen", amazonLink: "https://www.amazon.com/dp/B0DLT9GBLX/ref=sspa_dk_detail_5?psc=1&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=ZM0GGMZJCXAN45R9M8ZT&pd_rd_wg=a7oj9&pd_rd_w=3o79P&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pd_rd_r=fdf14a9f-7463-4929-8f78-11f19f14eb91&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Mental Wellness", image: "/images/health books/book4.jpg", author: "Dr. James Wilson", amazonLink: "https://www.amazon.com/dp/B0DTT3W4DD/ref=sspa_dk_detail_4?psc=1&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=T3KTHCZAGA9KJR3P5SFJ&pd_rd_wg=T20Ys&pd_rd_w=ygVOY&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pd_rd_r=ccefa02f-b1cf-4021-b48e-21ab8ab79082&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Yoga & Meditation", image: "/images/health books/book5.jpg", author: "Sarah Martinez", amazonLink: "https://www.amazon.com/dp/B0C6C15SLR/ref=sspa_dk_detail_5?psc=1&pd_rd_i=B0C6C15SLR&pd_rd_w=ygVOY&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=T3KTHCZAGA9KJR3P5SFJ&pd_rd_wg=T20Ys&pd_rd_r=ccefa02f-b1cf-4021-b48e-21ab8ab79082&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Strength Training", image: "/images/health books/book6.jpg", author: "Coach David Lee", amazonLink: "https://www.amazon.com/How-Stop-Being-Narcissist-Relationships/dp/B0BV1F28NB/ref=bmx_dp_d_sccl_2_13/135-9574565-7193540?pd_rd_w=33oJr&content-id=amzn1.sym.43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_p=43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_r=5QH8E308FSR72B5QAGAZ&pd_rd_wg=jqEyp&pd_rd_r=e5b1d350-66a2-4bd8-9128-45372c1b101c&pd_rd_i=B0BV1F28NB&psc=1" }
      ]
    },
    {
      name: "Self-Help",
      image: "/images/category-business.png",
      staggered: false,
      books: [
        { title: "Self-Help Book 1", image: "/images/selfhelp/book1.jpg", amazonLink: "https://www.amazon.com/Couples-Therapy-Workbook-Communication-Relationship/dp/B0BRMT2928/ref=bmx_dp_d_sccl_2_3/135-9574565-7193540?pd_rd_w=6Ug9Q&content-id=amzn1.sym.43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_p=43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_r=7CRVKR3N8M4PDDE0A58V&pd_rd_wg=Lml9h&pd_rd_r=768367c9-8341-4132-bda4-9528606e41c2&pd_rd_i=B0BRMT2928&psc=1" },
        { title: "Self-Help Book 2", image: "/images/selfhelp/book2.jpg", amazonLink: "https://www.amazon.com/Heal-Your-Inner-Child-Relationships/dp/B0DP2Y6M9J/ref=bmx_dp_d_sccl_2_16/135-9574565-7193540?pd_rd_w=33oJr&content-id=amzn1.sym.43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_p=43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_r=5QH8E308FSR72B5QAGAZ&pd_rd_wg=jqEyp&pd_rd_r=e5b1d350-66a2-4bd8-9128-45372c1b101c&pd_rd_i=B0DP2Y6M9J&psc=1" },
        { title: "Self-Help Book 3", image: "/images/selfhelp/book3.jpg", amazonLink: "https://www.amazon.com/dp/B0FRZ59W5F/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B0FRZ59W5F&pd_rd_w=ygVOY&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=T3KTHCZAGA9KJR3P5SFJ&pd_rd_wg=T20Ys&pd_rd_r=ccefa02f-b1cf-4021-b48e-21ab8ab79082&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Self-Help Book 4", image: "/images/selfhelp/book4.jpg", amazonLink: "https://www.amazon.com/dp/B08PT6S7ZW/ref=sspa_dk_detail_11?psc=1&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=TCDFK4FCNS8H0Q5AQ0ZS&pd_rd_wg=fyzS5&pd_rd_w=K5k47&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pd_rd_r=e56d1b9a-556f-4b60-8949-8a229eef4cd9&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Self-Help Book 5", image: "/images/selfhelp/book5.jpg", amazonLink: "https://www.amazon.com/dp/B0F9B36LBD/ref=sspa_dk_detail_6?psc=1&pf_rd_p=7446a9d1-25fe-4460-b135-a60336bad2c9&pf_rd_r=ZM0GGMZJCXAN45R9M8ZT&pd_rd_wg=a7oj9&pd_rd_w=3o79P&content-id=amzn1.sym.7446a9d1-25fe-4460-b135-a60336bad2c9&pd_rd_r=fdf14a9f-7463-4929-8f78-11f19f14eb91&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw" },
        { title: "Self-Help Book 6", image: "/images/selfhelp/book6.jpg", amazonLink: "https://www.amazon.com/How-Stop-Being-Narcissist-Relationships/dp/B0BV1F28NB/ref=bmx_dp_d_sccl_2_13/135-9574565-7193540?pd_rd_w=33oJr&content-id=amzn1.sym.43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_p=43dd9979-c547-4d63-9aca-cb4cebe845a6&pf_rd_r=5QH8E308FSR72B5QAGAZ&pd_rd_wg=jqEyp&pd_rd_r=e5b1d350-66a2-4bd8-9128-45372c1b101c&pd_rd_i=B0BV1F28NB&psc=1" }
      ]
    },
    {
      name: "Business &\nMoney",
      image: "/images/category-business.png",
      staggered: true,
      books: [
        { title: "Business Strategy Guide", image: "/images/business/1.jpg", author: "Dr. Sarah Johnson", amazonLink: "https://www.amazon.com/Your-Business-Could-Worth-More/dp/B0DVRXYDS4/ref=sr_1_1?crid=2CK7C1C8PUKB1&dib=eyJ2IjoiMSJ9.Kmavu-AKthF7olr80xAWQf_byCC0l8XojNAII3BMGkkYd0isxSyzEaBE36pHV7-N3bDLHbogGkvvws5gOpAbfw.FCdcuq2xFqWLfMaoM0PeikNOQA7pe2CpQ3gSMOmxPr8&dib_tag=se&keywords=Your+Business+Could+Be+Worth+More&qid=1759419005&s=books&sprefix=your+business+could+be+worth+more%2Cstripbooks-intl-ship%2C309&sr=1-1" },
        { title: "Financial Freedom", image: "/images/business/2.jpg", author: "Mike Thompson", amazonLink: "https://www.amazon.com/Future-Work-Business-Enterprises-Certified/dp/B09M57Y8SN/ref=sr_1_1?crid=1IS5BX4D0PT7O&dib=eyJ2IjoiMSJ9.OLyICqqospeUwT1AiM3BqA.7deWBlQuYzu3CsMwHV03fuAT9Cf27pmukHtfq_I7pvE&dib_tag=se&keywords=The+Future+of+Work%3A+Business+Advice+for+Small+and+Medium+Enterprises&qid=1759419182&s=books&sprefix=the+future+of+work+business+advice+for+small+and+medium+enterprises%2Cstripbooks-intl-ship%2C434&sr=1-1#detailBullets_feature_div" },
        { title: "Investment Essentials", image: "/images/business/3.jpg", author: "Dr. Lisa Chen", amazonLink: "https://www.amazon.com/Bottom-Line-Multiplier-Building-Profitable/dp/B0CY8X74K7/ref=sr_1_1?crid=171LAB17DRXCS&dib=eyJ2IjoiMSJ9.q1ZhcocB9Ff5lYI9L25ZaPzAmnEEfwTwsZKmfGjLfks.sqTJrsO3RC4P6YVmorxcxIKdoPdppQNRpJsbZ_G4twA&dib_tag=se&keywords=The+Bottom+Line+Multiplier&qid=1759418936&s=books&sprefix=how+to+hit+your+business.%2Cstripbooks-intl-ship%2C698&sr=1-1" },
        { title: "Entrepreneurship Guide", image: "/images/business/4.jpg", author: "Dr. James Wilson", amazonLink: "https://www.amazon.com/Exit-Style-Grace-More-Money-ebook/dp/B0DKCGK3W9/ref=sr_1_1?crid=3F8980URWRQ9Q&dib=eyJ2IjoiMSJ9.FFOQiSomEM6xyzpROU35kv7CIQ_V1MQiYV6UJGsGGyzKP05ISLr8gLIJZiu8Duf1IzWn_w2OzoMEjx3i68MFUw.dKYGg3kx9d8at8j5GP_1e42iKlM5p-FbVjtXmzALdcs&dib_tag=se&keywords=Exit+with+Style%2C+Grace%2C+and+More+Money&qid=1759419060&s=books&sprefix=exit+with+style%2C+grace%2C+and+more+money%2Cstripbooks-intl-ship%2C267&sr=1-1" },
        { title: "Marketing Mastery", image: "/images/business/5.jpg", author: "Sarah Martinez", amazonLink: "https://www.amazon.com/HOW-HIT-YOUR-BUSINESS-business/dp/B0BHS9F1LG/ref=sr_1_3?crid=2B6HR9GMQI9MT&dib=eyJ2IjoiMSJ9.phMnlthm0XpmNgbqiumqs716KVX87Kw4HjvNJHUMuD8TwdoXZOslPRpcr14N5hiJludPPrQ4x5rS7yQYfI4AUi1wUum8vM02v3dmhWHzCYLRXZts75UBgkbmSziS0ER9jMPBMqVuqbk-EF87Q_IS0Xa1ASUnSNsZ7opd4k74-fuwzUZmJYklWbvrT5KzaU8Aii_e-mhdwSERdeloTsVTkPO0X7KHJsEL8vjxuGJb400.ZHR4rUXBVLknIW427wk1H7zA52-jKfu9DdGWEg_YYnQ&dib_tag=se&keywords=HOW+TO+HIT+YOUR+BUSINESS.&qid=1759418858&s=books&sprefix=how+to+hit+your+business.%2Cstripbooks-intl-ship%2C675&sr=1-3#detailBullets_feature_div" },
        { title: "Leadership Excellence", image: "/images/business/6.jpg", author: "Coach David Lee", amazonLink: "https://www.amazon.com/LITTLE-BOOK-SECRETS-STARTING-BUSINESS-ebook/dp/B0D1HJFRBG/ref=sr_1_1?crid=2II25H0MXNRBY&dib=eyJ2IjoiMSJ9.PEev3QgCCaiqAlyFRQeSwmp9agPz1skuFZRxWLXZEBIyG_cIVefWGtlYa6Eb5CdbcOqG_cGld0tax2YXi6c2VZ9IMeTB_TfCzXC6br3WaPS7ZdYG3vS353VyR2fDNQX2bZxdG1Z0V5Chww2llPzo0A6SaJ2kDPiC42Mx6zJ5OuIS4Qm_9t8O6ulR4J4MV6LyCxrpE8oGDAs_QWbMEM037kexvEY9U4GksqK1NmebJJU.xSbYMRCxb07p_n-WEbgxaI6wgVQRxTAqVpEllBGDO58&dib_tag=se&keywords=THE+LITTLE+BOOK+OF+SECRETS+TO+STARTING+YOUR+OWN+BUSINESS&qid=1759419325&s=books&sprefix=the+little+book+of+secrets+to+starting+your+own+business%2Cstripbooks-intl-ship%2C262&sr=1-1#detailBullets_feature_div" }
      ]
    }
  ];

  return (
    <>
      {/* This style block hides the scrollbar on the element it's applied to */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* White Section with Heading */}
      <div className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Badge/Tag */}
          <motion.div 
            className="flex justify-center mb-6 sm:mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#95e5f3] text-[#2c2420] px-3 sm:px-4 lg:px-5 py-2 lg:py-2.5 rounded-full">
              <span className="font-medium text-xs sm:text-sm lg:text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>Book Categories</span>
            </div>
          </motion.div>

          {/* Category Headers */}
          <div className="relative">
            {/* Continuous underline */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></div>
            
            <div className="flex flex-nowrap justify-start sm:justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 hide-scrollbar px-2 sm:px-4">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                  className={`relative flex flex-col items-center transition-all duration-300 flex-shrink-0 group min-h-[50px] sm:min-h-[60px] ${
                    activeCategory === category.name 
                      ? 'text-[#35c4dd]' 
                      : 'text-[#2c2420] hover:text-[#35c4dd]'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-light text-sm sm:text-base md:text-lg lg:text-2xl tracking-wide mb-2 px-1 sm:px-2 text-center leading-tight whitespace-nowrap" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {category.name.replace(/\n/g, ' ')}
                  </span>
                  {/* Active category highlight */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    activeCategory === category.name 
                      ? 'bg-[#35c4dd]' 
                      : 'bg-transparent group-hover:bg-[#35c4dd]/30'
                  }`}></div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main wrapper matching Services section */}
      <div className="w-full bg-white flex justify-center">
        {/* Scalable container with responsive height */}
        <div className="relative w-full max-w-[1920px] h-auto py-16 lg:aspect-[1920/1080] lg:py-0 overflow-hidden select-none">
          
          {/* Background Layer 1: The Wavy Blue Shape */}
          <div className="absolute inset-0 z-0">
            <Image src={imgVector8} alt="Wavy background shape" fill className="object-cover" />
          </div>

          {/* Background Layer 2: The Masked Video */}
          <div className="absolute inset-0 z-10" 
               style={{
                  maskImage: `url('${imgRealisticSharkOcean2}')`,
                  maskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
               }}>
            <div className="relative w-full h-full">
              <video 
                ref={videoRef}
                autoPlay={isInView}
                loop 
                muted 
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover blur-md"
                poster="/images/bi-vid.jpeg"
              >
                <source src="/images/bi-vid.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#052126]/40" />
            </div>
          </div>

          {/* Content Layer */}
          <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-white pt-8 sm:pt-10 md:pt-12 lg:pt-20 px-4 sm:px-5 lg:px-0">
            {/* Books Display */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-3 gap-y-6 sm:gap-y-8 md:gap-y-12">
                  {categories
                    .find(cat => cat.name === activeCategory)
                    ?.books.map((book, bookIndex) => (
                      <motion.div
                        key={bookIndex}
                        className="group cursor-pointer relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: bookIndex * 0.1 }}
                        onClick={() => window.open((book as any).amazonLink, '_blank')}
                      >
                        {/* Glassmorphic Container */}
                        <div className="absolute inset-0 mx-[5%] sm:mx-[10%] md:mx-[15%] lg:mx-[20%] -my-2 sm:-my-3 bg-white/10 rounded-xl sm:rounded-2xl border border-white/30 shadow-lg z-10 group-hover:scale-95 transition-transform duration-300 ease-out">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl sm:rounded-2xl"></div>
                          {/* Diagonal Flash Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                            <div className="absolute -top-1 -right-1 w-8 h-full bg-white/60 transform -skew-x-12 translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-800 ease-out"></div>
                          </div>
                        </div>
                        
                        {/* Book Image */}
                        <div className="relative z-0 group-hover:scale-95 transition-transform duration-300 ease-out">
                          <Image
                            src={book.image}
                            alt={book.title}
                            width={200}
                            height={300}
                            className="w-full h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] object-contain"
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCategoriesHome;

