namespace GsmDataImporter.Model
{
    public readonly struct Tilt
    {
        private readonly double value;

        public Tilt(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Tilt
                ? value.Equals(((Tilt)obj).value)
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

        public static bool operator ==(Tilt a, Tilt b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Tilt a, Tilt b)
        {
            return a.value != b.value;
        }
    }
}
