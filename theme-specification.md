# Art Collector Theme Specification

## Overview
This document specifies the complete design system for the Art Collector application, including typography scales, color palettes, and semantic naming conventions.

## Typography System

### Headings
The heading hierarchy provides clear visual hierarchy for content organization.

| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `headingHuge` | 28px | Black | 34px | Large Title | Main page titles, hero sections |
| `headingProfile` | 24px | Heavy | 24px | Large Title | Profile headers, section titles |
| `headingBig` | 20px | Heavy | 24px | Large Title | Major section headers |
| `heading` | 18px | Bold | 22px | Headline | Standard section headers |
| `headingSmall` | 16px | Bold | 19px | Title 2 | Subsection headers |
| `headingTiny` | 14px | Bold | 17px | Title 3 | Minor headers, card titles |

### Buttons
Button typography scales with button size for optimal touch targets and readability.

| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `buttonBig` | 18px | Bold | 23px | Title | Primary CTAs, large buttons |
| `button` | 16px | Bold | 21px | Subheadline | Standard buttons |
| `buttonSmall` | 14px | Bold | 18px | Subheadline | Secondary buttons |
| `buttonTiny` | 12px | Bold | 16px | Subheadline | Tertiary buttons, badges |

### Body Text
Body text provides readable content with appropriate line spacing.

| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `bodyHuge` | 18px | Semibold | 28px | Body | Large body text, important content |
| `bodyBig` | 16px | Semibold | 28px | Body | Standard body text |
| `body` | 14px | Semibold | 28px | Body | Regular body text |

### Labels
Labels provide semantic text styling for UI elements and metadata.

#### Standard Labels
| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `labelBig` | 16px | Bold | 21px | Caption | Large labels, important metadata |
| `label` | 14px | Bold | 18px | Caption | Standard labels |
| `labelSmall` | 12px | Bold | 16px | Caption | Small labels |
| `labelTiny` | 10px | Bold | 13px | Footnote | Micro labels, badges |

#### Emphasis Labels
| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `labelBigEmphasis` | 16px | Heavy | 21px | Caption | High-emphasis large labels |
| `labelEmphasis` | 14px | Heavy | 18px | Caption | High-emphasis labels |
| `labelSmallEmphasis` | 12px | Heavy | 16px | Caption | High-emphasis small labels |
| `labelTinyEmphasis` | 10px | Heavy | 13px | Footnote | High-emphasis micro labels |

#### Special Labels
| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `labelLight` | 14px | Semibold | 18px | Caption | Subtle labels, secondary info |
| `artTitleLabel` | 16px | Bold (Italic) | 21px | Title | Artwork titles |
| `smallTitle` | 12px | Bold (Italic) | 16px | Caption | Small artwork titles |

### Number Displays
Specialized typography for numerical data and statistics.

| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `numberDisplayHuge` | 56px | Heavy | 62px | Headline | Hero statistics, large numbers |
| `numberDisplayBig` | 28px | Heavy | 28px | Headline | Major statistics |
| `numberDisplay` | 18px | Heavy | 23px | Headline | Standard statistics |
| `numberDisplaySmall` | 16px | Bold | 19px | Headline | Small statistics |

### Form Elements
| Style | Font Size | Weight | Line Height | Relative To | Use Case |
|-------|-----------|--------|-------------|-------------|----------|
| `textField` | 16px | Semibold | 18px | Body | Input fields, form text |

## Color System

### Primary Colors
Core brand colors that establish the application's identity.

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `background` | #F5F5F0 | 245, 245, 240 | Main app background |
| `primary` | #0692E2 | 6, 146, 226 | Primary brand color, main CTAs |
| `link` | #0570AD | 5, 112, 173 | Hyperlinks, navigation |
| `accent` | #000000 | 0, 0, 0 | Accent elements, emphasis |
| `award` | #EADFD0 | 234, 223, 208 | Award badges, special highlights |

### Semantic Colors
Colors that convey meaning and status.

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `green` | #00D084 | 0, 208, 132 | Success states, positive actions |
| `blue` | #0692E2 | 6, 146, 226 | Information, primary actions |
| `red` | #CF2D2D | 207, 45, 45 | Errors, destructive actions |
| `amber` | #FBB800 | 251, 184, 0 | Warnings, attention |
| `orange` | #FF6900 | 255, 105, 0 | Alerts, high priority |

### Extended Palette
Additional colors for specific use cases and visual variety.

#### Dark Variants
| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `darkGreen` | #009961 | 0, 153, 97 | Dark success states |
| `darkAmber` | #BD8A00 | 189, 138, 0 | Dark warning states |
| `darkBlue` | #0570AD | 5, 112, 173 | Dark information states |

#### Light Variants
| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `lightBlue` | #E6F5FE | 230, 245, 254 | Light blue backgrounds |
| `lightRed` | #FAEAEA | 250, 234, 234 | Light error backgrounds |

#### Accent Colors
| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `peach` | #FECDA5 | 254, 205, 165 | Warm accents |
| `pink` | #FFCEEC | 255, 206, 236 | Soft accents |
| `magenta` | #C52178 | 197, 33, 120 | Bold accents |
| `midBlue` | #8ED1FC | 142, 209, 252 | Medium blue accents |
| `purple` | #C06BE8 | 192, 107, 232 | Purple accents |
| `teal` | #33A7B5 | 51, 167, 181 | Teal accents |
| `yellow` | #EDD853 | 237, 216, 83 | Yellow accents |

### Neutral Colors
Grayscale colors for text, borders, and backgrounds.

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `beige` | #EADFD0 | 234, 223, 208 | Warm neutral |
| `grey` | #EDEDEA | 237, 237, 234 | Light gray backgrounds |
| `grey2` | #D9D9D9 | 217, 217, 217 | Medium gray backgrounds |
| `greyBorder` | rgba(0,0,0,0.16) | 0, 0, 0, 0.16 | Subtle borders |
| `greyShadow` | #ADADA9 | 173, 173, 169 | Shadow effects |

### Base Colors
| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `white` | #FFFFFF | 255, 255, 255 | Pure white |
| `black` | #000000 | 0, 0, 0 | Pure black |

### Text Colors
Semantic text colors with varying opacity levels.

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `text0` | #000000 | 0, 0, 0 | Primary text (100% opacity) |
| `text1` | #DB000000 | 0, 0, 0, 0.86 | Secondary text (86% opacity) |
| `text2` | #A3000000 | 0, 0, 0, 0.64 | Tertiary text (64% opacity) |
| `text3` | #7A000000 | 0, 0, 0, 0.48 | Quaternary text (48% opacity) |

### Context Colors
Colors for specific contexts and contrast requirements.

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `onDark` | #FFFFFF | 255, 255, 255 | Text on dark backgrounds |
| `onLight` | #000000 | 0, 0, 0 | Text on light backgrounds |

### Surface Colors
Background colors for different UI layers and elevation levels.

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| `surface0` | #FFFFFF | 255, 255, 255 | Top-level surfaces |
| `surface1` | #F5F5F0 | 245, 245, 240 | Primary background |
| `surface2` | #EDEDEA | 237, 237, 234 | Secondary backgrounds |
| `surface3` | #D9D9D9 | 217, 217, 217 | Tertiary backgrounds |

## Design Principles

### Typography Hierarchy
1. **Consistency**: Each text style has a specific purpose and should be used consistently
2. **Readability**: Line heights are optimized for comfortable reading
3. **Accessibility**: Font weights and sizes meet accessibility standards
4. **Scalability**: The system scales appropriately across different screen sizes

### Color Usage
1. **Semantic Meaning**: Colors convey meaning beyond aesthetics
2. **Accessibility**: All color combinations meet WCAG contrast requirements
3. **Consistency**: Colors are used consistently across the application
4. **Flexibility**: The palette supports both light and dark themes

### Implementation Guidelines
1. **Typography**: Always use the predefined text styles rather than custom values
2. **Colors**: Use semantic color names rather than hex values in code
3. **Spacing**: Maintain consistent spacing around text elements
4. **Responsive**: Ensure typography scales appropriately on different devices

## Usage Examples

### Headers
```swift
Text("Artwork Title")
    .font(theme.headingBig)
    .foregroundColor(theme.text0)
```

### Body Text
```swift
Text("Artwork description goes here...")
    .font(theme.body)
    .foregroundColor(theme.text1)
```

### Buttons
```swift
Button("Collect Art") {
    // Action
}
.font(theme.button)
.foregroundColor(theme.onDark)
.background(theme.primary)
```

### Labels
```swift
Text("Artist Name")
    .font(theme.label)
    .foregroundColor(theme.text2)
```

This specification ensures consistent design implementation across the Art Collector application while maintaining flexibility for future enhancements. 