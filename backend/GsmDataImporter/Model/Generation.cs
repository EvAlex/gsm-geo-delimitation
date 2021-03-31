namespace GsmDataImporter.Model
{
    public readonly struct Generation
    {
        private readonly string value;

        public Generation(string value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Generation
                ? value.Equals(((Generation)obj).value)
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public static bool operator ==(Generation a, Generation b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Generation a, Generation b)
        {
            return a.value != b.value;
        }
    }
}
