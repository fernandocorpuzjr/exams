export class Utils {
  public static getUnknownPropertyValue(
    obj: unknown,
    key: string
  ): unknown | null {
    let value = null;
    if (obj && typeof obj === 'object' && Utils.hasOwnProperty(obj, key)) {
      value = obj[key];
    }
    return value;
  }

  // Utility function the fixes accessing a property of unknown type
  // Ref: https://betterprogramming.pub/typescript-into-the-unknown-4c19d913cb15
  public static hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
  ): obj is X & Record<Y, unknown> {
    return Object.hasOwnProperty.call(obj, prop);
  }
}
