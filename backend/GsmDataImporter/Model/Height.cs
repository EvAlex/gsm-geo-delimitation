namespace GsmDataImporter.Model
{
    public readonly struct Height
    {
        private readonly double value;

        public Height(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Height
                ? value.Equals(((Height)obj).value)
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

        public static bool operator ==(Height a, Height b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Height a, Height b)
        {
            return a.value != b.value;
        }
    }
}
