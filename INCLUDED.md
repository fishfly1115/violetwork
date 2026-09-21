# 收錄專案與圖像遮罩狀態

生成時間：2026-09-21（Asia/Taipei）

## 收錄（9 案）

| # | Site slug | 來源 project id | 遮罩／圖像策略 |
|---|-----------|-----------------|----------------|
| 1 | `productization-ai-ui` | `productization-ai-ui` | 來源無 UI 截圖；自製去識別概念圖（不含產品名／部門／姓名） |
| 2 | `esg-ai-ocr-entry` | `esg-ai-ocr-entry` | UI 示意遮罩產品 logo（ESG SMB）、雇主頁腳、示意供應商／據點／公用事業檔名 |
| 3 | `vibe-coding-collaboration` | `vibe-coding-collaboration` | UI 截圖黑條遮罩品牌／側欄／IP；略過含 JWT 的圖 |
| 4 | `security-asset-platform` | `security-asset-platform` | 全數 UI 截圖遮罩 hostname／IP／頁首 |
| 5 | `design-ai-exploration` | `design-ai-exploration` | 流程插畫原圖；其餘頁眉預先遮罩 |
| 6 | `aiops-market-research` | `aiops-market-research` | **不上架競品／產品截圖**；頁內 HTML 旅程圖 |
| 7 | `deposit-ux-merged` | `deposit-ux-revamp-workflow` **+** `deposit-ux-tracking-plan` | 合併單一案例；使用流程圖（safer）；排除產業敏感分析圖／影音後台 |
| 8 | `research-institute-web-redesign` | `research-institute-web-redesign` | 重遮罩頁首／頁尾／助手／新聞卡；排除人像與聯絡資訊頁 |
| 9 | `pm-vs-design-alignment` | `pm-vs-design-alignment` | 插畫為主，標為 safer，原圖使用 |

## 排除

| project id | 原因 |
|------------|------|
| `template-deck-sparse` | 內容空白／僅企業模板 |
| `productization-design-system` | 薄弱短講；封面含姓名／部門；人像 `portrait_EXCLUDE`（較完整論述見 `productization-ai-ui`） |

## 仍可能偏風險的圖像（建議上線前再目視）

- `images/security-asset-platform/*_redacted.png`：表格可見 Windows／CVE 示意文案（無雇主 hostname）；若需更保守可再裁切或改為線框示意
- `images/vibe-coding-collaboration/*_redacted.png`：遮罩後仍可見 UI 結構，請確認無殘留產品字樣
- `images/research-institute-web-redesign/*_redacted.png`：大面積遮罩後可辨識「研究機構官網」類型；若需零風險可改為純線框／不放圖
- `images/design-ai-exploration/img02–04_redacted.png`：僅頁眉遮罩，建議再掃一次內部工具 chrome
- AIOps：目前無圖；勿把 `assets/aiops-market-research/` 原圖直接拷入 site
- `productization-ai-ui`：概念圖為自製，無品牌；來源 thumbnail 未上架
- `images/esg-ai-ocr-entry/*_redacted.png`：黑條遮罩產品 logo／雇主頁腳／供應商與據點；示意統一編號若仍可見可再加遮

## 文案別名（可見文案）

- 雇主／產品正式名 → 省略或「企業資安／智能維運產品」等產業描述
- 儲值客戶／娛樂品牌 → 不具名
- 研究機構 → 「研究機構客戶」敘事，不具名
- 綠能產品線代號／事業處／講者姓名 → 省略（見 `productization-ai-ui`）
- ESG 產品正式名（如 SMB 產品線）→ 「企業 ESG 活動數據平台」；示意供應商／據點 → 遮罩
- 署名 → Finny Chiu · UIUX Designer
