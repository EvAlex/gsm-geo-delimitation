namespace GsmDataImporter.Model
{
    public readonly struct Raster
    {
        private readonly double value;

        public Raster(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Raster
                ? value.Equals(((Raster)obj).value)
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

        public static bool operator ==(Raster a, Raster b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Raster a, Raster b)
        {
            return a.value != b.value;
        }
    }
}
