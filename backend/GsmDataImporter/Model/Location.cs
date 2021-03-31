namespace GsmDataImporter.Model
{
    public readonly struct Location
    {
        private readonly string value;

        public Location(string value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Location
                ? value.Equals(((Location)obj).value)
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public static bool operator ==(Location a, Location b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Location a, Location b)
        {
            return a.value != b.value;
        }
    }
}
