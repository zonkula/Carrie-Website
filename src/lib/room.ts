import type { CollectionEntry } from 'astro:content';

type Room = CollectionEntry<'rooms'>['data'];
type Dimensions = CollectionEntry<'paintings'>['data']['dimensions'];

/** Gallery standard: the centre of a painting hangs 57 in above the floor (average eye level). */
export const EYE_LEVEL_IN = 57;
/** Minimum gap between the bottom of the painting and furniture below it. */
export const FURNITURE_GAP_IN = 8;

/**
 * Where a painting sits on a room's wall, at true scale.
 *
 * Everything is worked out in the room photo's own pixels, then turned into percentages of
 * the photo's width and height. The mockup can then be shown at any screen size and the
 * painting stays exactly in proportion to the room.
 *
 *   painting size (px)  = inches × pixelsPerInch
 *   centre height (in)  = 57, or higher if needed to clear the furniture by 8 in:
 *                         max(57, furnitureTop + 8 + height / 2)
 *   centre row (px)     = floorY − centre height × pixelsPerInch
 */
export function placeOnWall(room: Room, size: Dimensions) {
  const { width: imageW, height: imageH } = room.image;
  const ppi = room.pixelsPerInch;

  const widthPx = size.width * ppi;
  const heightPx = size.height * ppi;

  const centreIn = Math.max(EYE_LEVEL_IN, room.furnitureTop + FURNITURE_GAP_IN + size.height / 2);
  const centreYPx = room.floorY - centreIn * ppi;

  const leftPx = room.centerX - widthPx / 2;
  const topPx = centreYPx - heightPx / 2;

  const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;
  return {
    left: pct(leftPx, imageW),
    top: pct(topPx, imageH),
    width: pct(widthPx, imageW),
    height: pct(heightPx, imageH),
    /** True if the painting runs off the photo (too big for this room's view). */
    overflows: leftPx < 0 || topPx < 0 || leftPx + widthPx > imageW,
    /** How much of the photo's width the painting takes, for picking image sizes. */
    widthShare: widthPx / imageW,
  };
}
