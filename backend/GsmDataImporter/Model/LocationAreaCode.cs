namespace GsmDataImporter.Model
{
    public readonly struct LocationAreaCode
    {
        private readonly int value;

        public LocationAreaCode(int value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is LocationAreaCode
                ? value.Equals(((LocationAreaCode)obj).value)
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public override string ToString()
        {
            return value.ToString();
        }

        public static bool operator ==(LocationAreaCode a, LocationAreaCode b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(LocationAreaCode a, LocationAreaCode b)
        {
            return a.value != b.value;
        }
    }
}
