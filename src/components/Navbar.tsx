"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight, Eye } from "lucide-react";
import useAuth from "@/lib/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // const { getUser } = getKindeServerSession();
  const user = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="text-2xl flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Vid<span className="text-orange-400">blix</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={handleSignOut}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </button>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Blix
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/fireAuth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Log In
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Blix
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className:
                      "bg-neutral-100 text-zinc-800 hover:text-neutral-100 hidden sm:flex items-center gap-1",
                  })}
                >
                  <Eye className="ml-1.5 h-5 w-5" />
                  View Blix
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
